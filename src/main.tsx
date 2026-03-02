import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PayPalScriptProvider options={{ clientId: "AXpJSsMW-s0-XUkIZVKgt6BaVGeVhkSzmzqujBdqx5Qx8cZpoNvvXEFw9vE2PGo2WNGaOUVXQnN6skXU", currency: "CAD" }}>
      <App />
    </PayPalScriptProvider>
  </StrictMode>,
)