import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import AcessoRapidoAnalisarAgendaCliente from '../../components/AgendaCliente';
import '../../styles/AgendaCliente.css';

function AnalisarAgendaClinica() {
  return (
    <div className="profissional-home">
      <Header />
      <br/>
      <div className="main-content">
        <Sidebar />
        <AcessoRapidoAnalisarAgendaCliente/>
      </div>
    </div>
  );
}

export default AnalisarAgendaClinica;
