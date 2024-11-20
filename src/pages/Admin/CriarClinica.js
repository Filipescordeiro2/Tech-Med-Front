import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import AcessoRapidoCriarClinica from '../../components/CriarClinica';
import '../../styles/CriarProfissional.css';

function CriarClinica() {
  return (
    <div className="profissional-home">
      <Header />
      <br/>
      <div className="main-content">
        <Sidebar />
        <AcessoRapidoCriarClinica/>
      </div>
    </div>
  );
}

export default CriarClinica;
