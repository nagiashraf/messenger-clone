import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { configureEcho } from '@laravel/echo-react'

configureEcho({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT,
    wssPort: import.meta.env.VITE_REVERB_PORT,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
})

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true })
    return pages[`./Pages/${name}.tsx`]
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <>
        <Toaster />
        <App {...props} />
      </>
    )
  },
})
