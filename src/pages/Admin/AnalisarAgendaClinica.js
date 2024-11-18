import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import AcessoRapidoAnalisarAgendaProfissional from '../../components/AnalisarAgendaClinica';
import '../../styles/AnalisarAgendaClinica.css';

function AnalisarAgendaClinica() {
  return (
    <div className="profissional-home">
      <Header />
      <br/>
      <div className="main-content">
        <Sidebar />
        <AcessoRapidoAnalisarAgendaProfissional/>
      </div>
    </div>
  );
}

export default AnalisarAgendaClinica;
