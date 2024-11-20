import React from 'react';
import { useUser } from '../context/UserContext'; // Importando o contexto do usuário
import '../styles/Header.css';

function Header() {
  const { user } = useUser(); // Obtendo os dados do usuário do contexto

  return (
    <header className="header">
      <h1>TechMed</h1>
      <div className="user-info">
        {user ? (
          <span>{`${user.nome} ${user.sobrenome}`}</span> // Concatenando nome e sobrenome
        ) : (
          <span>Usuário não logado</span>
        )}
      </div>
    </header>
  );
}

export default Header;
