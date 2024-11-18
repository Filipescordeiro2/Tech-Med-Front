import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Remova o BrowserRouter daqui
import AdminHome from '../pages/Admin/AdminHome'; // Importando a página do administrador
import Login from '../pages/Login'; // Importando a página de login
import CriarProfissional from '../pages/Admin/CriarProfissional';
import CriarAgendaProfissional from '../pages/Admin/CriarAgendaProfissional';
import CriarClinica from '../pages/Admin/CriarClinica';
import AnalisarAgendaProfissional from '../pages/Admin/AnalisarAgendaProfissional'
import AnalisarAgendaClinica from '../pages/Admin/AnalisarAgendaClinica'


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} /> {/* Rota para a tela de login */}
      <Route path="/admin" element={<AdminHome />} /> {/* Rota para a página do administrador */}
      <Route path="/criarProfissional" element={<CriarProfissional />} />
      <Route path="/criarClinica" element={<CriarClinica />} />
      <Route path="/criarAgendaProfissional" element={<CriarAgendaProfissional />} />
      <Route path="/analisarAgendaProfissional" element={<AnalisarAgendaProfissional />} />
      <Route path="/analisarAgendaClinica" element={<AnalisarAgendaClinica />} />

      {/* Adicione outras rotas aqui */}
    </Routes>
  );
}

export default AppRoutes;
