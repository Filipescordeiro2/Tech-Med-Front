import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import AcessoRapidoIncluirProfissional from '../../components/IncluirProfissional';
import '../../styles/IncluirProfissional.css';

function incluirProfissional() {
  return (
    <div className="profissional-home">
      <Header />
      <br/>
      <div className="main-content">
        <Sidebar />
        <AcessoRapidoIncluirProfissional/>
      </div>
    </div>
  );
}

export default incluirProfissional;
