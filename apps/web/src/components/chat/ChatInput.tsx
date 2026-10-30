import { Input } from '@codegouvfr/react-dsfr/Input'
import { useEffect, useRef, useState } from 'react'
import { useApiUrl, useEmbedToken } from '../../hooks/use-api-url'
import { ChatInputSubmitButton } from './ChatInputSubmitButton'
import { useChat } from './context/hook'
import { createBotMessage, createLoadingMessage, createUserMessage } from './helpers'
import { createSSEUrl, useSSE } from '../../hooks/use-sse';
import type { PublicSession } from '../../hooks/use-session'

export function ChatInput() {
	const inputRef = useRef<HTMLInputElement>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [inputValue, setInputValue] = useState('')
	const apiUrl = useApiUrl()
	const embedToken = useEmbedToken()
	const { ensureSession, setMessages } = useChat()

	const { handleSSEConnection } = useSSE({ setMessages, setIsLoading })

	// Auto-focus input when AI finishes responding
	useEffect(() => {
		if (!isLoading && inputRef.current) {
			// DSFR Input component wraps the native input, so we need to find it
			const nativeInput = inputRef.current.querySelector('input')
			if (nativeInput) {
				nativeInput.focus()
			}
		}
	}, [isLoading])

	const handleSendMessage = async () => {
		if (!inputValue.trim() || isLoading) return

		const userMessage = createUserMessage({ content: inputValue })
		setMessages((prev) => [...prev, userMessage])
		setInputValue('')
		setIsLoading(true)

		const { id: loadingMessageId, message: loadingMessage } = createLoadingMessage()
		setMessages((prev) => [...prev, loadingMessage])

		let session: PublicSession
		try {
			session = await ensureSession()
		} catch (error) {
			console.error('Failed to create session:', error)
			setMessages((prev) => [
				...prev.filter((message) => message.id !== loadingMessageId),
				createBotMessage({ content: 'Erreur', isFinished: true }),
			])
			setIsLoading(false)
			return
		}

		await handleSSEConnection(
			createSSEUrl(apiUrl, embedToken, session.sessionId, userMessage.content),
			session.sessionToken,
			loadingMessageId,
		)
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			handleSendMessage()
		}
	}

	const isSubmitButtonDisabled = !inputValue.trim() || isLoading

	return (
		<Input
			ref={inputRef}
			className="w-full"
			nativeInputProps={{
				type: 'text',
				value: inputValue,
				onChange: (e) => setInputValue(e.target.value),
				onKeyDown: handleKeyDown,
				placeholder: 'Tapez votre message...',
				autoFocus: true,
			}}
			disabled={isLoading}
			addon={<ChatInputSubmitButton disabled={isSubmitButtonDisabled} onClick={handleSendMessage} />}
			label="Poser une question"
			state="default"
			stateRelatedMessage="Text de validation / d'explication de l'erreur"
		/>
	)
}
