import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <App />
  </StrictMode>,
)
const allowedHosts = [
  "throneofstar.com",
  "www.t throneofstar.com",
];

if (!allowedHosts.includes(window.location.hostname)) {
  window.location.replace("https://throneofstar.com");
}