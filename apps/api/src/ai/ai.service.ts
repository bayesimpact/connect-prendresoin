import { Injectable } from '@nestjs/common';
import {
  Content,
  ContentListUnion,
  GenerateContentResponse,
  GoogleGenAI,
} from '@google/genai';
import { Langfuse } from 'langfuse';
import { ChatSession } from '../prendresoin/models/chat-session.model';

@Injectable()
export class AIService {
  private genAI: GoogleGenAI;
  private langfuse: Langfuse;

  constructor() {
    this.genAI = new GoogleGenAI({
      vertexai: true,
      project: process.env.GCP_PROJECT || 'prendresoin-479613',
      location: process.env.LOCATION || 'europe-west1',
    });

    // Initialize Langfuse
    this.langfuse = new Langfuse({
      secretKey: process.env.LANGFUSE_SK,
      publicKey: process.env.LANGFUSE_PK,
      baseUrl: process.env.LANGFUSE_BASE_URL,
    });
  }

  private buildContents(chatSession: ChatSession): ContentListUnion {
    const contents: Content[] = [];

    // Group consecutive tool responses into ONE user message with MULTIPLE functionResponse parts
    let toolResponseParts: any[] = [];

    for (const message of chatSession.messages) {
      if (message.sender === 'tool') {
        // Accumulate tool responses with matching IDs
        const functionName = message.toolCalls[0].name;
        toolResponseParts.push({
          functionResponse: {
            name: functionName,
            response: JSON.parse(message.content || '{}'),
          },
        });
      } else {
        // Flush accumulated tool responses before adding non-tool message
        if (toolResponseParts.length > 0) {
          contents.push({ role: 'user', parts: toolResponseParts });
          toolResponseParts = [];
        }

        // Add non-tool message
        if (message.sender === 'assistant' && message.toolCalls?.length) {
          // Assistant message with function calls (each with ID)
          contents.push({
            role: 'model',
            parts: message.toolCalls.map((tc) => ({
              functionCall: {
                name: tc.name,
                args: tc.arguments,
              },
            })),
          });
        } else {
          // Regular user or assistant text message
          contents.push({
            role: message.sender === 'assistant' ? 'model' : 'user',
            parts: [{ text: message.content || '' }],
          });
        }
      }
    }

    // Flush any remaining tool responses
    if (toolResponseParts.length > 0) {
      contents.push({ role: 'user', parts: toolResponseParts });
    }

    return contents;
  }

  async *generateChatStream({
    chatSession,
    masterPrompt: systemInstructions,
  }: {
    chatSession: ChatSession;
    masterPrompt: string;
  }): AsyncGenerator<GenerateContentResponse> {
    const trace = this.langfuse.trace({
      id: `session-${chatSession.id}`,
      name: 'chat-session',
      sessionId: chatSession.id,
      userId: chatSession.id,
      metadata: {
        sessionId: chatSession.id,
        totalMessages: chatSession.messages.length,
        createdAt: chatSession.createdAt,
      },
    });

    const contents = this.buildContents(chatSession);

    const generation = trace.generation({
      name: `turn-${chatSession.messages.length}`,
      model: 'gemini-2.5-flash',
      modelParameters: {
        temperature: 0,
        thinkingBudget: 0,
      },
      input: {
        systemInstructions,
        contents,
      },
      metadata: {
        turnNumber: chatSession.messages.length,
        systemInstructionLength: systemInstructions.length,
      },
    });

    try {
      const streamResult = await this.genAI.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          temperature: 0,
          systemInstruction: systemInstructions,
          thinkingConfig: {
            thinkingBudget: 0,
          },
        },
      });
      let fullOutput = '';
      let lastChunck: GenerateContentResponse;
      for await (const chunk of streamResult) {
        lastChunck = chunk;
        // Accumulate output for Langfuse
        if (chunk.candidates?.[0]?.content?.parts) {
          for (const part of chunk.candidates[0].content.parts) {
            if (part.text) {
              fullOutput += part.text;
            }
          }
        }
        yield chunk;
      }

      // Update generation with output, function calls, and usage
      generation.update({
        output: fullOutput,
        usage: {
          input: lastChunck?.usageMetadata.promptTokenCount,
          output: lastChunck?.usageMetadata.candidatesTokenCount,
          total: lastChunck?.usageMetadata.totalTokenCount,
          unit: 'TOKENS',
        },
      });

      generation.end();
      console.info(
        `LLM call completed. Tokens: ${lastChunck?.usageMetadata.totalTokenCount}`,
      );
    } catch (error) {
      // Log error to Langfuse
      generation.update({
        level: 'ERROR',
        statusMessage: error instanceof Error ? error.message : 'Unknown error',
      });
      generation.end();

      console.error('[AI Service] LLM call failed:', error);
      throw error;
    } finally {
      await this.langfuse.flushAsync();
    }
  }
}
