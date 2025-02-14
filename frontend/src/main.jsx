import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
import AuthContext from './context/authContext.jsx';

createRoot(document.getElementById('root')).render(
  <AuthContext>
    <App />
  </AuthContext>,
)
