import { Card, CardContent } from '@repo/ui/card'
import type { ReactNode } from 'react'
import { useChat } from './context/hook'
import { MessageList } from './MessageList'

export function ChatContainer({ children }: { children: ReactNode }) {
	const { messages } = useChat()

	return (
		<div className="relative flex-1 w-full overflow-hidden">
			<div className="mx-auto max-w-4xl px-4 h-full py-4">
				<Card className="flex h-full flex-col overflow-hidden">
					<CardContent className="flex flex-1 flex-col p-0 min-h-0">
						<MessageList messages={messages} />

						<div className="p-6 pt-4">{children}</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
