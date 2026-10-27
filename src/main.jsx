import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { StudentProvider } from './context/StudentContext.jsx'
import { ToastProvider } from './components/UI/Toast.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <StudentProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </StudentProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
