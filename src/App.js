import React from 'react';
import AppRoutes from './routes/Route'; // Importando o AppRoutes
import { UserProvider } from './context/UserContext'; // Importando o UserProvider
import './styles/App.css';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <AppRoutes />
      </div>
    </UserProvider>
  );
}

export default App;
