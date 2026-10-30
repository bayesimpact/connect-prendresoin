export function useApiUrl(): string {
	return import.meta.env.VITE_API_URL
}

export function useEmbedToken(): string {
	return import.meta.env.VITE_EMBED_TOKEN
}

// Base path of the platform public chat API v1 for the agent of the embed token
export const agentBasePath = (apiUrl: string, embedToken: string): string =>
	`${apiUrl}/public/v1/agents/${encodeURIComponent(embedToken)}`
