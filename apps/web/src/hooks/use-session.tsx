import { useCallback, useRef, useState } from 'react'
import type { Message } from '../components/types'
import { agentBasePath } from './use-api-url'

export type PublicSession = {
	sessionId: string
	sessionToken: string
}

// Same text as the greeting of the platform agent, which the session starts with on the server
const GREETING = "Bienvenue sur Prendre Soin ! Comment puis-je vous aider aujourd'hui ?"

export function useSession({ apiUrl, embedToken }: { apiUrl: string; embedToken: string }) {
	const [messages, setMessages] = useState<Message[]>(() => [
		{
			id: 'greeting',
			content: GREETING,
			sender: 'assistant',
			timestamp: new Date(),
			isFinished: true,
		},
	])

	// The host page loads the iframe on every page view: the session is created on the first message only
	const sessionRef = useRef<Promise<PublicSession> | null>(null)

	const ensureSession = useCallback((): Promise<PublicSession> => {
		if (!sessionRef.current) {
			sessionRef.current = (async () => {
				const response = await fetch(`${agentBasePath(apiUrl, embedToken)}/sessions`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ payload: {} }),
				})
				if (!response.ok) throw new Error(`Create session failed: ${response.status}`)
				const { data } = await response.json()
				return { sessionId: data.sessionId, sessionToken: data.sessionToken }
			})()
			// A failed creation is tried again on the next message
			sessionRef.current.catch(() => {
				sessionRef.current = null
			})
		}
		return sessionRef.current
	}, [apiUrl, embedToken])

	return {
		ensureSession,
		messages,
		setMessages,
		apiUrl,
	}
}
