import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import AcessoRapidoExamesPaciente from '../../components/ProtuarioMedico';
import '../../styles/ProtuarioMedico.css';

function ProtuarioMedico() {
  return (
    <div className="profissional-home">
      <Header />
      <br/>
      <div className="main-content">
        <Sidebar />
        <AcessoRapidoExamesPaciente/>
      </div>
    </div>
  );
}

export default ProtuarioMedico;
