import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SocketProvider } from './context/socketProvider.tsx'
import { UserProvider } from './context/UserProvider.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
    <UserProvider>
      <SocketProvider>
        <App />
        <ToastContainer />
      </SocketProvider>  
    </UserProvider>
   </BrowserRouter>,
)
