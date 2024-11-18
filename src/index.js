import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Importando o Router
import App from './App';
import { UserProvider } from './context/UserContext'; // Importando o UserProvider
import '@fortawesome/fontawesome-free/css/all.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router> {/* Envolvendo o UserProvider e App com o Router */}
      <UserProvider>
        <App />
      </UserProvider>
    </Router>
  </React.StrictMode>
);
