import { ChatAssistantWidget } from '../../../modules/siso-chat-assistant/react/ChatAssistantWidget.jsx'

const MELANO_THEME = {
  cocoa: '#4d2e10',
  bark: '#522700',
  sand: '#ede1d4',
  paper: '#fffdf9',
  panelWidth: '360px',
}

/**
 * MelanoTresses host configuration for the reusable SISO chat module.
 * Keep the endpoint same-origin so provider credentials never reach the
 * browser.
 */
export default function MelanoChatWidget({ endpoint = '/api/chat' }) {
  return (
    <ChatAssistantWidget
      endpoint={endpoint}
      brandName="MelanoTresses"
      logoSrc="/images/logo-mt.png"
      ariaLabel="MelanoTresses chat assistant"
      theme={MELANO_THEME}
    />
  )
}
