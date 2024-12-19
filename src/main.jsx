import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './Component/Frontend/CartContext.jsx'

import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <>
    <CartProvider>
      {/* <Toaster /> */}
      <ToastContainer />
      <App />
    </CartProvider>
  </>,
)
