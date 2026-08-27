import { createChatHealthHandler } from '../../../modules/siso-chat-assistant/server/chat-handler.js'

export const onRequest = createChatHealthHandler({ moduleId: 'chat-assistant' })
