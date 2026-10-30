import { createContext, type Dispatch, type SetStateAction } from 'react'
import type { PublicSession } from '../../../hooks/use-session'
import type { Message } from '../../types'

export type ChatContextType = {
	messages: Message[]
	ensureSession: () => Promise<PublicSession>
	setMessages: Dispatch<SetStateAction<Message[]>>
}

export const ChatContext = createContext<ChatContextType | null>(null)
