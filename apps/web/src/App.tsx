import { headerFooterDisplayItem } from '@codegouvfr/react-dsfr/Display'
import { Header } from '@codegouvfr/react-dsfr/Header'
import logoFranceTravail from './assets/logo_france_travail.png'
import logoPrendreSoin from './assets/logo_prendre_soin.png'
import { ChatContainer } from './components/chat/ChatContainer'
import { ChatInput } from './components/chat/ChatInput'
import { Provider as ChatProvider } from './components/chat/context/Provider'

function App() {
	return (
		<>
			<Header
				id="fr-header-simple-header-with-service-title-and-tagline"
				brandTop={
					<>
						RÉPUBLIQUE
						<br />
						FRANÇAISE
					</>
				}
				serviceTitle={
					<div className="flex max-h-10 items-center gap-2">
						<img src={logoFranceTravail} alt="Logo France Travail" className="h-10 max-h-10 w-auto" />
						<img src={logoPrendreSoin} alt="Logo Prendre Soin" className="h-10 max-h-10 w-auto" />
					</div>
				}
				homeLinkProps={{ title: 'Accueil - Prendre Soin Chatbot', href: '/' }}
				quickAccessItems={[
					// Theme toggle
					headerFooterDisplayItem,
				]}
			/>
			<ChatProvider>
				<ChatContainer>
					<ChatInput />
				</ChatContainer>
			</ChatProvider>
		</>
	)
}

export default App
