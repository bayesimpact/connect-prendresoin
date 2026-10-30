import type { ReactNode } from 'react'
import { ChatContext } from '.'
import { useApiUrl, useEmbedToken } from '../../../hooks/use-api-url'
import { useSession } from '../../../hooks/use-session'

export function Provider({ children }: { children: ReactNode }) {
	const apiUrl = useApiUrl()
	const embedToken = useEmbedToken()
	const { messages, setMessages, ensureSession } = useSession({ apiUrl, embedToken })
	return <ChatContext.Provider value={{ messages, setMessages, ensureSession }}>{children}</ChatContext.Provider>
}
