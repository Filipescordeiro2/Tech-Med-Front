import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import AcessoRapidoAgendaProfissional from '../../components/CriarAgendaProfissional';
import '../../styles/CriarAgenda.css';

function CriarProfissional() {
  return (
    <div className="profissional-home">
      <Header />
      <br/>
      <div className="main-content">
        <Sidebar />
        <AcessoRapidoAgendaProfissional/>
      </div>
    </div>
  );
}

export default CriarProfissional;
