import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './Component/Frontend/CartContext.jsx'
createRoot(document.getElementById('root')).render(
  <>
    <CartProvider>
      <App />
    </CartProvider>
  </>,
)
