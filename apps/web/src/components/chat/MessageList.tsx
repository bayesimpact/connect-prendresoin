import { useEffect, useRef } from 'react'
import { BotMessage } from '../BotMessage'
import type { Message } from '../types'
import { UserMessage } from '../UserMessage'

export function MessageList({ messages }: { messages: Message[] }) {
	const scrollAreaRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (scrollAreaRef.current) {
			scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
		}
	}, [messages])

	return (
		<div
			ref={scrollAreaRef}
			className="flex-1 min-h-0 overflow-y-auto px-6"
		>
			<div className="space-y-4 pt-6 pb-4">
				{messages.map((message) =>
					message.sender === 'user' ? (
						<UserMessage key={message.id} message={message} />
					) : (
						<BotMessage key={message.id} message={message} />
					),
				)}
			</div>
		</div>
	)
}
