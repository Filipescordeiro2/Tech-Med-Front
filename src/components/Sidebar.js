import React, { useState } from 'react';
import '../styles/Sidebar.css';

function Sidebar() {
  const [doctorsOpen, setDoctorsOpen] = useState(false);
  const [patientsOpen, setPatientsOpen] = useState(false);
  const [staffOpen, setStaffOpen] = useState(false);

  const toggleDoctorsMenu = () => {
    setDoctorsOpen(!doctorsOpen);
  };

  const togglePatientsMenu = () => {
    setPatientsOpen(!patientsOpen);
  };

  const toggleStaffMenu = () => {
    setStaffOpen(!staffOpen);
  };

  return (
    <nav className="sidebar">
      <ul>
        <li onClick={() => window.location.href = '/admin'}>
          <i className="fa fa-home"></i> Acesso Rapido
        </li>
        <li onClick={toggleDoctorsMenu}>
          <i className="fa fa-user-md"></i> Medicos
          <i className={`fa fa-chevron-${doctorsOpen ? 'up' : 'down'}`}></i>
        </li>
        {doctorsOpen && (
          <ul className="submenu">
            <li onClick={() => window.location.href = '/criarProfissional'}>Criar Usuario Medico</li>
            <li onClick={() => window.location.href = '/criarAgendaProfissional'}>Criar Agenda Medico</li>
            <li onClick={() => window.location.href = '/analisarAgendaProfissional'}>Agenda dos profissionais</li>
          </ul>
        )}
        <li onClick={togglePatientsMenu}>
          <i className="fa fa-user"></i> Pacientes
          <i className={`fa fa-chevron-${patientsOpen ? 'up' : 'down'}`}></i>
        </li>
        {patientsOpen && (
          <ul className="submenu">
            <li>Dados Pacientes</li>
            <li onClick={()=>window.location.href='/prontuarioMedico'}>Prontuario Paciente</li>
            <li>Agendamentos Paciente</li>
          </ul>
        )}
        <li onClick={toggleStaffMenu}>
          <i className="fa fa-users"></i> Clinica
          <i className={`fa fa-chevron-${staffOpen ? 'up' : 'down'}`}></i>
        </li>
        {staffOpen && (
          <ul className="submenu">
            <li onClick={()=>window.location.href='/analisarAgendaClinica'}>Agendas Clinicas</li>
            <li onClick={()=>window.location.href='/criarClinica'}>Criar Clinica</li>
            <li onClick={()=>window.location.href='/incluirProfissional'}>Incluir Medico</li>
          </ul>
        )}
      </ul>
    </nav>
  );
}

export default Sidebar;
