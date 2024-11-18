import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import AcessoRapidoProfissional from '../../components/CriarProfissional';
import '../../styles/CriarProfissional.css';

function CriarProfissional() {
  return (
    <div className="profissional-home">
      <Header />
      <br/>
      <div className="main-content">
        <Sidebar />
        <AcessoRapidoProfissional/>
      </div>
    </div>
  );
}

export default CriarProfissional;
