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

const currentHost = window.location.hostname;

if (!allowedHosts.includes(currentHost)) {
  window.location.replace("https://throneofstar.com");
}
