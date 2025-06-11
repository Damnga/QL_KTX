import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import './index.css';
import { PhongProvider } from './context/PhongContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PhongProvider>
        <App />
      </PhongProvider>
    </BrowserRouter>
  </StrictMode>
)
