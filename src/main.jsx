import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './Component/Frontend/CartContext.jsx'
import { Toaster } from 'react-hot-toast'
createRoot(document.getElementById('root')).render(
  <>
    <CartProvider>
    <Toaster />
      <App />
    </CartProvider>
  </>,
)
