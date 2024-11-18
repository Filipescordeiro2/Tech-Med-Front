import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import AcessoRapido from '../../components/AcessoRapido';
import '../../styles/AdminHome.css';

function AdminHome() {
  return (
    <div className="admin-home">
      <Header />
      <br/>
      <div className="main-content">  
        <Sidebar />
        <AcessoRapido />
      </div>
    </div>
  );
}

export default AdminHome;
