# MelanoTresses host adapter

The reusable module lives at
`modules/siso-chat-assistant/`. This folder contains only Melano's host
configuration: brand palette, logo, endpoint and the client-approved prompt.

`MelanoChatWidget.jsx` is therefore the complete integration point for this
site. Another client can import the same module's `ChatAssistantWidget`, pass
its own logo/theme/endpoint, and create a Pages Function with its own prompt
and curated fallback.

Provider configuration is server-side only. `GROQ_API_KEY` enables the live
assistant with the default `openai/gpt-oss-20b` model; without it, preview
uses the explicit grounded fallback and is not pretending to be AI.
