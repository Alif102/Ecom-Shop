import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './Component/Frontend/CartContext.jsx'

import { ToastContainer } from 'react-toastify';
import React from 'react';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      {/* <Toaster /> */}
      {/* <ToastContainer /> */}
      <App />
    </CartProvider>
  </React.StrictMode>,
)
