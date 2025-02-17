import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import AcessoRapidoAnalisarAgendaClinica from '../../components/AnalisarAgendaClinica';
import '../../styles/AnalisarAgendaClinica.css';

function AnalisarAgendaClinica() {
  return (
    <div className="profissional-home">
      <Header />
      <br/>
      <div className="main-content">
        <Sidebar />
        <AcessoRapidoAnalisarAgendaClinica/>
      </div>
    </div>
  );
}

export default AnalisarAgendaClinica;
