import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { DarkModeProvider } from './contexts/DarkModeWrapper.jsx'
import { ToastContainer } from 'react-toastify'
import { RecoilRoot } from 'recoil'
import { ChatProvider } from './contexts/ChatProvider.jsx'
import { SocketProvider } from './contexts/SocketProvider.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <RecoilRoot>
      <SocketProvider>
      <ChatProvider>
        <DarkModeProvider>
          <App />
        </DarkModeProvider>
        <ToastContainer />
      </ChatProvider>
      </SocketProvider>
    </RecoilRoot>
  </BrowserRouter>,
)
