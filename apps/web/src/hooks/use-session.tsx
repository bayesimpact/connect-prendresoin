import { useEffect, useState } from 'react'
import type { Message } from '../components/types'
import { agentBasePath } from './use-api-url'

type PublicSessionMessage = {
	id: string
	role: 'user' | 'assistant' | 'tool'
	content: string
	createdAt: number
}

export function useSession({ apiUrl, embedToken }: { apiUrl: string; embedToken: string }) {
	const [messages, setMessages] = useState<Message[]>([])

	const [sessionId, setSessionId] = useState<string | null>(null)
	const [sessionToken, setSessionToken] = useState<string | null>(null)

	useEffect(() => {
		const initializeSession = async () => {
			try {
				const basePath = agentBasePath(apiUrl, embedToken)
				const createResponse = await fetch(`${basePath}/sessions`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ payload: {} }),
				})
				if (!createResponse.ok) throw new Error(`Create session failed: ${createResponse.status}`)
				const { data: created } = await createResponse.json()

				// The greeting is the first assistant message of the new session
				const sessionResponse = await fetch(`${basePath}/sessions/${created.sessionId}`, {
					headers: { 'X-Session-Token': created.sessionToken },
				})
				if (!sessionResponse.ok) throw new Error(`Get session failed: ${sessionResponse.status}`)
				const { data: session } = await sessionResponse.json()

				setSessionId(created.sessionId)
				setSessionToken(created.sessionToken)
				setMessages(
					(session.messages as PublicSessionMessage[])
						.filter((message) => message.role !== 'tool')
						.map((message) => ({
							id: message.id,
							content: message.content,
							sender: message.role === 'user' ? 'user' : 'assistant',
							timestamp: new Date(message.createdAt),
							isFinished: true,
						})),
				)
			} catch (error) {
				console.error('Failed to create session:', error)
				setMessages([
					{
						id: '1',
						content: 'Impossible erreur',
						sender: 'assistant',
						timestamp: new Date(),
					},
				])
			}
		}
		initializeSession()
	}, [apiUrl, embedToken])

	return {
		sessionId,
		sessionToken,
		messages,
		setMessages,
		apiUrl,
	}
}
