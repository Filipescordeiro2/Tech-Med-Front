import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import AcessoRapidoDadosPaciente from '../../components/DadosPaciente';
import '../../styles/DadosPaciente.css';

function DadosPaciente() {
  return (
    <div className="profissional-home">
      <Header />
      <br/>
      <div className="main-content">
        <Sidebar />
        <AcessoRapidoDadosPaciente/>
      </div>
    </div>
  );
}

export default DadosPaciente;
