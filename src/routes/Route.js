import React from 'react';
<<<<<<< HEAD
import { Route, Routes } from 'react-router-dom';
=======
import { Route, Routes } from 'react-router-dom'; // Remova o BrowserRouter daqui
>>>>>>> 3266ea51e60edee22d1b157d47c4c994b2b3c35b
import AdminHome from '../pages/Admin/AdminHome'; // Importando a página do administrador
import Login from '../pages/Login'; // Importando a página de login
import CriarProfissional from '../pages/Admin/CriarProfissional';
import CriarAgendaProfissional from '../pages/Admin/CriarAgendaProfissional';
import CriarClinica from '../pages/Admin/CriarClinica';
<<<<<<< HEAD
import AnalisarAgendaProfissional from '../pages/Admin/AnalisarAgendaProfissional';
import AnalisarAgendaClinica from '../pages/Admin/AnalisarAgendaClinica';
import IncluirProfissional from '../pages/Admin/IncluirProfissional';
import ProtuarioMedico from '../pages/Admin/ProtuarioMedico';
import ProntuarioPage from '../pages/Admin/ProntuarioPage'; // Importando a página do prontuário
=======
import AnalisarAgendaProfissional from '../pages/Admin/AnalisarAgendaProfissional'
import AnalisarAgendaClinica from '../pages/Admin/AnalisarAgendaClinica'

>>>>>>> 3266ea51e60edee22d1b157d47c4c994b2b3c35b

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
<<<<<<< HEAD
      <Route path="/incluirProfissional" element={<IncluirProfissional />} />
      <Route path="/prontuarioMedico" element={<ProtuarioMedico />} />
      <Route path="/prontuario/:id" element={<ProntuarioPage />} /> {/* Rota para a página do prontuário */}
=======
>>>>>>> 3266ea51e60edee22d1b157d47c4c994b2b3c35b

      {/* Adicione outras rotas aqui */}
    </Routes>
  );
}

<<<<<<< HEAD
export default AppRoutes;
=======
export default AppRoutes;
>>>>>>> 3266ea51e60edee22d1b157d47c4c994b2b3c35b
