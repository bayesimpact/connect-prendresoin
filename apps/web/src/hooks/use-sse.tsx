import { type Dispatch, type SetStateAction, useCallback } from 'react'
import { createBotMessage } from '../components/chat/helpers'
import type { Message, MessageEventData } from '../components/types'
import { agentBasePath } from './use-api-url'

type CloseStream = () => void

export function useSSE({
	setMessages,
	setIsLoading,
}: {
	setMessages: Dispatch<SetStateAction<Message[]>>
	setIsLoading: Dispatch<SetStateAction<boolean>>
}) {
	const handleStartEvent = useCallback(
		(data: MessageEventData, loadingMessageId: string) => {
			setMessages((prev) =>
				prev.map((msg) =>
					msg.id === loadingMessageId
						? createBotMessage({
								id: data.messageId,
								content: '...',
								timestamp: data.timestamp ? new Date(data.timestamp) : new Date(),
								isInitializing: false,
							})
						: msg,
				),
			)
			// Replace the loading message with the actual bot message when the start event is received
			return { messageId: data.messageId, content: '' }
		},
		[setMessages],
	)

	const handleChunkEvent = useCallback(
		(data: MessageEventData, currentContent: string) => {
			const newContent = currentContent + data.content
			setMessages((prev) =>
				prev.map((msg) =>
					msg.id === data.messageId
						? ({ ...msg, content: newContent, isProcessingFunctions: false } satisfies Message)
						: msg,
				),
			)
			return { messageId: data.messageId, content: newContent }
		},
		[setMessages],
	)

	const handleEndEvent = useCallback(
		(data: MessageEventData, closeStream: CloseStream) => {
			setMessages((prev) =>
				prev.map((msg) =>
					msg.id === data.messageId
						? ({ ...msg, isFinished: true, isProcessingFunctions: false } satisfies Message)
						: msg,
				),
			)
			closeStream()
			setIsLoading(false)
		},
		[setMessages, setIsLoading],
	)

	const handleErrorEvent = useCallback(
		(data: MessageEventData, closeStream: CloseStream) => {
			console.error('Stream error:', data.error)
			closeStream()
			setMessages((prev) => {
				if (!data.error) return prev
				return [
					...prev,
					createBotMessage({
						id: Date.now().toString(),
						content: data.error,
						isFinished: true,
					}),
				]
			})
			setIsLoading(false)
		},
		[setMessages, setIsLoading],
	)

	const handleSSEError = useCallback(() => {
		const errorMessage = createBotMessage({ content: 'Erreur' })
		setMessages((prev) => [...prev, errorMessage])
		setIsLoading(false)
	}, [setIsLoading, setMessages])

	const createSSEEventHandler = useCallback(
		(loadingMessageId: string, messageId: string, content: string) => {
			return (eventData: string, closeStream: CloseStream) => {
				try {
					const data: MessageEventData = JSON.parse(eventData)

					switch (data.type) {
						case 'start':
							return handleStartEvent(data, loadingMessageId)
						case 'chunk':
							return handleChunkEvent(data, content)
						case 'end':
							handleEndEvent(data, closeStream)
							return null
						case 'error':
							handleErrorEvent(data, closeStream)
							return null
						default:
							return { messageId, content }
					}
				} catch (error) {
					console.error('Error parsing SSE data:', error)
					return { messageId, content }
				}
			}
		},
		[handleStartEvent, handleChunkEvent, handleEndEvent, handleErrorEvent],
	)

	// The session token travels in a header, which EventSource cannot send: read the SSE body with fetch
	const handleSSEConnection = useCallback(
		async (url: string, sessionToken: string, loadingMessageId: string) => {
			let currentMessageId = ''
			let currentContent = ''
			let isClosed = false
			const abortController = new AbortController()
			const closeStream = () => {
				isClosed = true
				abortController.abort()
			}

			const handleEventData = (eventData: string) => {
				const handler = createSSEEventHandler(loadingMessageId, currentMessageId, currentContent)
				const result = handler(eventData, closeStream)

				if (result) {
					currentMessageId = result.messageId
					currentContent = result.content
				}
			}

			try {
				const response = await fetch(url, {
					headers: { Accept: 'text/event-stream', 'X-Session-Token': sessionToken },
					signal: abortController.signal,
				})
				if (!response.ok || !response.body) throw new Error(`Stream failed: ${response.status}`)

				const reader = response.body.pipeThrough(new TextDecoderStream()).getReader()
				let buffer = ''
				while (!isClosed) {
					const { value, done } = await reader.read()
					if (done) break
					buffer += value
					const frames = buffer.split(/\r?\n\r?\n/)
					buffer = frames.pop() ?? ''
					for (const frame of frames) {
						const dataLines = frame
							.split(/\r?\n/)
							.filter((line) => line.startsWith('data:'))
							.map((line) => line.slice(5).trimStart())
						if (dataLines.length > 0 && !isClosed) handleEventData(dataLines.join('\n'))
					}
				}
				// The server closes the connection after the final event
				if (!isClosed) handleSSEError()
			} catch (error) {
				if (isClosed) return
				console.error('Stream error:', error)
				handleSSEError()
			}
		},
		[handleSSEError, createSSEEventHandler],
	)

	return { handleSSEConnection }
}

export const createSSEUrl = (apiUrl: string, embedToken: string, sessionId: string, content: string): string => {
	const params = new URLSearchParams({ q: JSON.stringify({ payload: { content } }) })
	return `${agentBasePath(apiUrl, embedToken)}/sessions/${sessionId}/messages/stream?${params}`
}
