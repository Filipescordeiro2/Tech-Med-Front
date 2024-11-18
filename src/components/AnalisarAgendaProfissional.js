import React, { useState, useEffect } from 'react';
import ToastrService from '../utils/ToastrService'; // Importa a instância do ToastrService
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import { buscarProfissionaisAtivos, buscarClinicasVinculadas, buscarEspecialidadesProfissional, buscarAgenda, buscarEnderecoClinica } from '../services/admin/profissionalService'; // Importa as funções necessárias
import { cancelarAgenda, obterDetalhesAgendamento } from '../services/admin/agendaService'; // Importa as funções para cancelar a agenda e obter detalhes do agendamento
import PaginationTable from '../utils/PaginationTable'; // Importa o componente de paginação
import Modal from '../utils/Modal'; // Importa o componente de modal
import '../styles/AnalisarAgendaProfissional.css'; // Importa o arquivo CSS

function AnalisarAgendaProfissional() {
  const [profissionais, setProfissionais] = useState([]);
  const [clinicas, setClinicas] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [selectedProfissional, setSelectedProfissional] = useState('');
  const [selectedClinica, setSelectedClinica] = useState('');
  const [selectedEspecialidade, setSelectedEspecialidade] = useState('');
  const [step, setStep] = useState(1);
  const [resultados, setResultados] = useState([]);
  const [filteredResultados, setFilteredResultados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null); // Flag para determinar o conteúdo do modal
  const [endereco, setEndereco] = useState(null);
  const [detalhesAgendamento, setDetalhesAgendamento] = useState(null);
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    const fetchProfissionais = async () => {
      try {
        const data = await buscarProfissionaisAtivos(); // Usa a nova função para buscar profissionais ativos
        setProfissionais(data);
      } catch (error) {
        ToastrService.showNotification('error', 'Erro ao buscar profissionais');
      }
    };

    fetchProfissionais();
  }, []);

  useEffect(() => {
    if (selectedProfissional) {
      const fetchClinicas = async () => {
        try {
          const data = await buscarClinicasVinculadas(selectedProfissional); // Usa a nova função para buscar clínicas vinculadas ao profissional
          setClinicas(data);
        } catch (error) {
          ToastrService.showNotification('error', 'Erro ao buscar clínicas');
        }
      };

      fetchClinicas();
    }
  }, [selectedProfissional]);

  useEffect(() => {
    if (selectedProfissional) {
      const fetchEspecialidades = async () => {
        try {
          const data = await buscarEspecialidadesProfissional(selectedProfissional); // Usa a nova função para buscar especialidades do profissional
          setEspecialidades(data);
        } catch (error) {
          ToastrService.showNotification('error', 'Erro ao buscar especialidades');
        }
      };

      fetchEspecialidades();
    }
  }, [selectedProfissional]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await buscarAgenda(selectedProfissional, selectedClinica, selectedEspecialidade); // Usa a nova função para buscar a agenda
      setResultados(data);
      setFilteredResultados(data); // Inicializa os resultados filtrados com todos os resultados
      setStep(4);
    } catch (error) {
      ToastrService.showNotification('error', 'Erro ao buscar resultados');
    }
  };

  const handleEyeClick = async (clinicaId) => {
    try {
      const endereco = await buscarEnderecoClinica(clinicaId); // Usa a nova função para buscar o endereço da clínica
      setEndereco(endereco);
      setModalContent('endereco'); // Define o conteúdo do modal como endereço
      setShowModal(true);
    } catch (error) {
      console.error('Erro ao buscar endereço da clínica:', error);
    }
  };

  const handleCancelClick = async (id) => {
    try {
      await cancelarAgenda(id); // Usa a nova função para cancelar a agenda
      ToastrService.showNotification('success', 'Agenda cancelada com sucesso');
      // Atualiza a lista de resultados após cancelar a agenda
      const updatedResultados = resultados.filter(resultado => resultado.codigoAgenda !== id);
      setResultados(updatedResultados);
      setFilteredResultados(updatedResultados); // Atualiza os resultados filtrados
    } catch (error) {
      ToastrService.showNotification('error', 'Erro ao cancelar a agenda');
    }
  };

  const handleViewClick = async (id) => {
    try {
      const detalhes = await obterDetalhesAgendamento(id); // Usa a nova função para obter os detalhes do agendamento
      console.log(detalhes); // Adiciona um console.log para depuração
      setDetalhesAgendamento(detalhes[0]); // Acessa o primeiro objeto do array
      setModalContent('detalhesAgendamento'); // Define o conteúdo do modal como detalhes do agendamento
      setShowModal(true);
    } catch (error) {
      ToastrService.showNotification('error', 'Erro ao obter detalhes do agendamento');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEndereco(null);
    setDetalhesAgendamento(null);
    setModalContent(null); // Reseta o conteúdo do modal
  };

  const handleFilterDateChange = (e) => {
    setFilterDate(e.target.value);
  };

  const handleFilterSubmit = () => {
    const filtered = resultados.filter(resultado => resultado.data === filterDate);
    setFilteredResultados(filtered);
  };

  const columns = [
    { header: 'Profissional', accessor: 'nomeProfissional' },
    { header: 'Clínica', accessor: 'clinica' },
    { header: 'Especialidade', accessor: 'nomeEspecialidadeProfissional' },
    { header: 'Horário', accessor: 'hora' },
    { header: 'Data', accessor: 'data' },
    { header: 'Status', accessor: 'statusAgenda' },
    // { header: 'ID da Agenda', accessor: 'codigoAgenda' } // Certifique-se de que o codigoAgenda está presente nos dados, mas não renderize a coluna
  ];

  return (
    <div className="criar-profissional-panel">
      <h2>Buscar agenda</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <select value={selectedProfissional} onChange={(e) => setSelectedProfissional(e.target.value)}>
              <option value="">Selecione um profissional</option>
              {profissionais.map(profissional => (
                <option key={profissional.id} value={profissional.id}>
                  {profissional.nome + ' ' + profissional.sobrenome}
                </option>
              ))}
            </select>
            <button type="button" onClick={() => setStep(2)} disabled={!selectedProfissional}>
              Próximo
            </button>
          </div>
        )}
        {step === 2 && (
          <div>
            <select value={selectedClinica} onChange={(e) => setSelectedClinica(e.target.value)}>
              <option value="">Selecione uma clínica</option>
              {clinicas.map(clinica => (
                <option key={clinica.id} value={clinica.id}>
                  {clinica.nomeClinica}
                </option>
              ))}
            </select>
            <button type="button" onClick={() => setStep(1)}>
              Anterior
            </button>
            <button type="button" onClick={() => setStep(3)} disabled={!selectedClinica}>
              Próximo
            </button>
          </div>
        )}
        {step === 3 && (
          <div>
            <select value={selectedEspecialidade} onChange={(e) => setSelectedEspecialidade(e.target.value)}>
              <option value="">Selecione uma especialidade</option>
              {especialidades.map(especialidade => (
                <option key={especialidade.id} value={especialidade.nomeEspecialidade}>
                  {especialidade.nomeEspecialidade}
                </option>
              ))}
            </select>
            <button type="button" onClick={() => setStep(2)}>
              Anterior
            </button>
            <button type="submit" disabled={!selectedEspecialidade}>
              Buscar
            </button>
          </div>
        )}
        {step === 4 && (
          <div>
            <button type="button" className="anterior" onClick={() => setStep(3)}>
              Anterior
            </button>
            <div className="filter-container">
              <label htmlFor="filterDate">Filtrar por data:</label>
              <input type="date" id="filterDate" value={filterDate} onChange={handleFilterDateChange} />
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

export default AnalisarAgendaProfissional;