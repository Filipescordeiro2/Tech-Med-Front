import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate
import DashboardPanel from './DashboardPanel';
import '../styles/AcessoRapido.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAddressCard, faCalendarAlt, faUserPlus, faCalendarPlus, faClipboardList, faClinicMedical } from '@fortawesome/free-solid-svg-icons';

function AcessoRapido() {
  const navigate = useNavigate(); // Inicializando useNavigate

  const handleCardClick = (title, path) => {
    if (path) {
      navigate(path); // Redirecionando para a nova rota
    } else {
      console.log(`${title} clicado`);
    }
  };

  return (
    <div className="acesso-rapido-panel">
      <h2>Acesso Rápido</h2>
      <DashboardPanel />
      <div className="charts-container">
        <h3>Paciente</h3>
        <div className="chart" onClick={() => handleCardClick('Prontuario Paciente','/prontuarioMedico')}>
          <FontAwesomeIcon icon={faUser} className="icon" />
          <h4>Prontuario Paciente</h4>
        </div>
        <div className="chart" onClick={() => handleCardClick('Dados Paciente','/dadosPaciente')}>
          <FontAwesomeIcon icon={faAddressCard} className="icon" />
          <h4>Dados Paciente</h4>
        </div>
        <div className="chart" onClick={() => handleCardClick('Agenda Paciente','/agendaCliente')}>
          <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
          <h4>Agendametos Paciente</h4>
        </div>
      </div>

      <div className="charts-container">
        <h3>Profissional</h3>
        <div className="chart" onClick={() => handleCardClick('Criar Profissional', '/criarProfissional')}>
          <FontAwesomeIcon icon={faUserPlus} className="icon" />
          <h4>Criar Profissional</h4>
        </div>
        <div className="chart" onClick={() => handleCardClick('Criar Agenda Profissional','/criarAgendaProfissional')}>
          <FontAwesomeIcon icon={faCalendarPlus} className="icon" />
          <h4>Criar Agenda Profissional</h4>
        </div>
        <div className="chart" onClick={() => handleCardClick('Analisar Agendas Profissionais','/analisarAgendaProfissional')}>
          <FontAwesomeIcon icon={faClipboardList} className="icon" />
          <h4>Analisar Agendas Profissionais</h4>
        </div>
      </div>

      <div className="charts-container">
        <h3>Clínica</h3>
        <div className="chart" onClick={() => handleCardClick('Criar Clínica','/criarClinica')}>
          <FontAwesomeIcon icon={faClinicMedical} className="icon" />
          <h4>Criar Clínica</h4>
        </div>
        <div className="chart" onClick={() => handleCardClick('Agendas Clínica','/analisarAgendaClinica')}>
          <FontAwesomeIcon icon={faCalendarPlus} className="icon" />
          <h4>Agendas Clínica</h4>
        </div>
        <div className="chart" onClick={() => handleCardClick('Incluir Profissional','/incluirProfissional')}>
          <FontAwesomeIcon icon={faUserPlus} className="icon" />
          <h4>Incluir Profissional</h4>
        </div>
      </div>
    </div>
  );
}

export default AcessoRapido;