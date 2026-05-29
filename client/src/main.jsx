import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { WalkthroughProvider } from './context/WalkthroughContext'
import { AuthProvider } from './context/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <AuthProvider>
         <WalkthroughProvider>
            <App />
         </WalkthroughProvider>
      </AuthProvider>
   </StrictMode>,
)
