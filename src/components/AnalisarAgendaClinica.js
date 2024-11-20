import React, { useState, useEffect } from 'react';
import ToastrService from '../utils/ToastrService';
import { useNavigate } from 'react-router-dom';
import { buscarClinicasAtivos, buscarAgenda, buscarEspecialidadesClinica, buscarEnderecoClinica, buscarProfissionaisClinica } from '../services/admin/clinicaService';
import { cancelarAgenda, obterDetalhesAgendamento } from '../services/admin/agendaService';
import PaginationTable from '../utils/PaginationTable';
import Modal from '../utils/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/AnalisarAgendaClinica.css';

function AnalisarAgendaClinica() {
  const [clinicas, setClinicas] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [selectedClinica, setSelectedClinica] = useState('');
  const [selectedEspecialidade, setSelectedEspecialidade] = useState('');
  const [selectedProfissional, setSelectedProfissional] = useState('');
  const [step, setStep] = useState(1);
  const [resultados, setResultados] = useState([]);
  const [filteredResultados, setFilteredResultados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [endereco, setEndereco] = useState(null);
  const [detalhesAgendamento, setDetalhesAgendamento] = useState(null);
  const [filterDate, setFilterDate] = useState(null);
  const [validDates, setValidDates] = useState({});

  useEffect(() => {
    const fetchClinicas = async () => {
      try {
        const data = await buscarClinicasAtivos();
        setClinicas(data);
      } catch (error) {
        ToastrService.showNotification('error', 'Erro ao buscar clínicas');
      }
    };

    fetchClinicas();
  }, []);

  useEffect(() => {
    if (selectedClinica) {
      const fetchEspecialidades = async () => {
        try {
          const data = await buscarEspecialidadesClinica(selectedClinica);
          setEspecialidades(data);
        } catch (error) {
          ToastrService.showNotification('error', 'Erro ao buscar especialidades');
        }
      };

      const fetchProfissionais = async () => {
        try {
          const data = await buscarProfissionaisClinica(selectedClinica);
          setProfissionais(data);
        } catch (error) {
          ToastrService.showNotification('error', 'Erro ao buscar profissionais');
        }
      };

      fetchEspecialidades();
      fetchProfissionais();
    }
  }, [selectedClinica]);

  useEffect(() => {
    if (resultados.length > 0) {
      const datesWithStatus = resultados.reduce((acc, resultado) => {
        if (!acc[resultado.data]) {
          acc[resultado.data] = { aberto: 0, outros: 0 };
        }
        if (resultado.statusAgenda === 'ABERTO') {
          acc[resultado.data].aberto += 1;
        } else {
          acc[resultado.data].outros += 1;
        }
        return acc;
      }, {});

      setValidDates(datesWithStatus);
    }
  }, [resultados]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await buscarAgenda(selectedClinica, selectedEspecialidade);
      setResultados(data);
      setFilteredResultados(data);
      setStep(4);
    } catch (error) {
      ToastrService.showNotification('error', 'Erro ao buscar resultados');
    }
  };

  const handleEyeClick = async (clinicaId) => {
    try {
      const endereco = await buscarEnderecoClinica(clinicaId);
      setEndereco(endereco);
      setModalContent('endereco');
      setShowModal(true);
    } catch (error) {
      console.error('Erro ao buscar endereço da clínica:', error);
    }
  };

  const handleCancelClick = async (id) => {
    try {
      await cancelarAgenda(id);
      ToastrService.showNotification('success', 'Agenda cancelada com sucesso');
      const updatedResultados = resultados.filter(resultado => resultado.codigoAgenda !== id);
      setResultados(updatedResultados);
      setFilteredResultados(updatedResultados);
    } catch (error) {
      ToastrService.showNotification('error', 'Erro ao cancelar a agenda');
    }
  };

  const handleViewClick = async (id) => {
    try {
      const detalhes = await obterDetalhesAgendamento(id);
      setDetalhesAgendamento(detalhes[0]);
      setModalContent('detalhesAgendamento');
      setShowModal(true);
    } catch (error) {
      ToastrService.showNotification('error', 'Erro ao obter detalhes do agendamento');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEndereco(null);
    setDetalhesAgendamento(null);
    setModalContent(null);
  };

  const handleFilterDateChange = (date) => {
    setFilterDate(date);
  };

  const handleFilterProfissionalChange = (e) => {
    setSelectedProfissional(e.target.value);
  };

  const handleFilterSubmit = () => {
    const filtered = resultados.filter(resultado => 
      (filterDate ? resultado.data === filterDate.toISOString().split('T')[0] : true) && 
      (selectedProfissional ? resultado.nomeProfissional === selectedProfissional : true)
    );
    setFilteredResultados(filtered);
  };

  const columns = [
    { header: 'Profissional', accessor: 'nomeProfissional' },
    { header: 'Clínica', accessor: 'clinica' },
    { header: 'Especialidade', accessor: 'nomeEspecialidadeProfissional' },
    { header: 'Horário', accessor: 'hora' },
    { header: 'Data', accessor: 'data' },
    { header: 'Status', accessor: 'statusAgenda' },
  ];

  const isDateSelectable = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return validDates[dateString] && validDates[dateString].aberto > 1;
  };

  const getDateClass = (date) => {
    const dateString = date.toISOString().split('T')[0];
    if (validDates[dateString]) {
      if (validDates[dateString].aberto > 0) {
        return 'date-open';
      } else if (validDates[dateString].outros > 0) {
        return 'date-other';
      }
    }
    return '';
  };

  return (
    <div className="criar-profissional-panel">
      <h2>Buscar agenda</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <select value={selectedClinica} onChange={(e) => setSelectedClinica(e.target.value)}>
              <option value="">Selecione uma clínica</option>
              {clinicas.map(clinica => (
                <option key={clinica.id} value={clinica.id}>
                  {clinica.nomeClinica}
                </option>
              ))}
            </select>
            <button type="button" onClick={() => setStep(2)} disabled={!selectedClinica}>
              Próximo
            </button>
          </div>
        )}
        {step === 2 && (
          <div>
            <select value={selectedEspecialidade} onChange={(e) => setSelectedEspecialidade(e.target.value)}>
              <option value="">Selecione uma especialidade</option>
              {especialidades.map(especialidade => (
                <option key={especialidade.id} value={especialidade.nomeEspecialidade}>
                  {especialidade.nomeEspecialidade}
                </option>
              ))}
            </select>
            <button type="button" onClick={() => setStep(1)}>
              Anterior
            </button>
            <button type="submit" disabled={!selectedEspecialidade}>
              Buscar
            </button>
          </div>
        )}
        {step === 4 && (
          <div>
            <button type="button" className="anterior" onClick={() => setStep(2)}>
              Anterior
            </button>
            <div className="filter-container">
              <label htmlFor="filterDate">Filtrar por data:</label>
              <DatePicker
                selected={filterDate}
                onChange={handleFilterDateChange}
                filterDate={isDateSelectable}
                dayClassName={getDateClass}
                dateFormat="yyyy-MM-dd"
                placeholderText="Selecione uma data"
              />
              <label htmlFor="filterProfissional">Filtrar por profissional:</label>
              <select id="filterProfissional" value={selectedProfissional} onChange={handleFilterProfissionalChange}>
                <option value="">Selecione um profissional</option>
                {profissionais.map(profissional => (
                  <option key={profissional.id} value={profissional.nomeProfissional}>
                    {profissional.nomeProfissional}
                  </option>
                ))}
              </select>
              <button type="button" onClick={handleFilterSubmit}>Pesquisar</button>
            </div>
            <PaginationTable data={filteredResultados} columns={columns} itemsPerPage={6} onEyeClick={handleEyeClick} onCancelClick={handleCancelClick} onViewClick={handleViewClick} />
          </div>
        )}
      </form>
      <Modal show={showModal} onClose={handleCloseModal} modalContent={modalContent} endereco={endereco} detalhesAgendamento={detalhesAgendamento} />
    </div>
  );
}

export default AnalisarAgendaClinica;