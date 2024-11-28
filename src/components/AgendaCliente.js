import React, { useState, useEffect } from 'react';
import ToastrService from '../utils/ToastrService';
import { useNavigate } from 'react-router-dom';
import PaginationTable from '../utils/PaginationTable';
import Modal from '../utils/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/AgendaCliente.css';
import { buscarAgendamentoPorCpf } from '../services/admin/clienteService';

function AgendaCliente() {
  const [clinicas, setClinicas] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [selectedClinica, setSelectedClinica] = useState('');
  const [selectedEspecialidade, setSelectedEspecialidade] = useState('');
  const [selectedProfissional, setSelectedProfissional] = useState('');
  const [step, setStep] = useState(1);
  const [filteredResultados, setFilteredResultados] = useState([]);
  const [originalResultados, setOriginalResultados] = useState([]); // Store original data
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [endereco, setEndereco] = useState(null);
  const [filterDate, setFilterDate] = useState(null);
  const [cpf, setCpf] = useState('');
  const [cliente, setCliente] = useState(null);

  const columns = [
    { header: 'Profissional', accessor: 'nomeProfissional' },
    { header: 'Clínica', accessor: 'clinica' },
    { header: 'Especialidade', accessor: 'nomeEspecialidadeProfissional' },
    { header: 'Horário', accessor: 'hora' },
    { header: 'Data', accessor: 'data' },
    { header: 'Status', accessor: 'statusAgenda' }
  ];

  const handleCpfSubmit = async (e) => {
    e.preventDefault();
    try {
      const clienteData = await buscarAgendamentoPorCpf(cpf);
      const updatedData = clienteData.map(item => ({
        ...item,
        nomeProfissional: `${item.nomeProfissional} ${item.sobrenomeProfissional}`
      }));
      setCliente(updatedData[0]); // Assuming the first item in the array contains the client data
      setOriginalResultados(updatedData); // Store the original data
      setFilteredResultados(updatedData); // Set the filtered results to the fetched data
      ToastrService.success('Cliente encontrado com sucesso!');
    } catch (error) {
      ToastrService.error('Erro ao buscar cliente. Verifique o CPF e tente novamente.');
    }
  };

  const handleFilterSubmit = () => {
    let filteredData = originalResultados;

    if (filterDate) {
      const selectedDate = filterDate.toISOString().split('T')[0];
      filteredData = filteredData.filter(item => item.data === selectedDate);
    }

    if (selectedProfissional) {
      filteredData = filteredData.filter(item => item.nomeProfissional === selectedProfissional);
    }

    setFilteredResultados(filteredData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for form submission
  };

  const handleEyeClick = (id) => {
    // Logic for handling eye icon click
  };

  const handleCancelClick = (id) => {
    // Logic for handling cancel icon click
  };

  const handleViewClick = (id) => {
    setModalContent('detalhesAgendamento');
    setShowModal(true);
    // Fetch and set the details of the appointment
  };

  const handleEnderecoClick = (endereco) => {
    setEndereco(endereco);
    setModalContent('endereco');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const detalhesAgendamento = (id) => {
    // Logic for fetching appointment details
  };

  useEffect(() => {
    const fetchProfissionais = async () => {
      try {
        const response = await fetch('http://localhost:8080/profissionais/ativos');
        const profissionaisData = await response.json();
        const formattedData = profissionaisData.map(profissional => ({
          id: profissional.id,
          nomeCompleto: `${profissional.nome} ${profissional.sobrenome}`
        }));
        setProfissionais(formattedData);
      } catch (error) {
        ToastrService.error('Erro ao buscar profissionais ativos.');
      }
    };

    fetchProfissionais();
  }, []);

  return (
    <div className="criar-profissional-panel">
      <h2>Buscar agenda</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <label htmlFor="cpf">CPF do Cliente:</label>
            <input
              type="text"
              id="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="Digite o CPF do cliente"
            />
            <button type="button" onClick={handleCpfSubmit} disabled={!cpf}>
              Buscar Cliente
            </button>
            {cliente && (
              <div className='descricao-caixa'>
                <p>Cliente: {cliente.nomeCliente} {cliente.sobrenomeCliente}</p>
                <p>Data de Nascimento: {cliente.dataDeNascimentoCliente}</p>
                <p>Email Cliente: {cliente.emailCliente}</p>
                <p>CPF: {cliente.cpfCliente}</p>
                <button type="button" onClick={() => setStep(2)}>
                  Próximo
                </button>
              </div>
            )}
          </div>
        )}
        {step === 2 && (
          <div>
            <button type="button" className="anterior" onClick={() => setStep(1)}>
              Anterior
            </button>
            <div className="filter-container">
              <label htmlFor="filterDate">Filtrar por data:</label>
              <DatePicker
                selected={filterDate}
                onChange={setFilterDate}
                dateFormat="yyyy-MM-dd"
                placeholderText="Selecione uma data"
              />
              <label htmlFor="filterProfissional">Filtrar por profissional:</label>
              <select id="filterProfissional" value={selectedProfissional} onChange={(e) => setSelectedProfissional(e.target.value)}>
                <option value="">Selecione um profissional</option>
                {profissionais.map(profissional => (
                  <option key={profissional.id} value={profissional.nomeCompleto}>
                    {profissional.nomeCompleto}
                  </option>
                ))}
              </select>
              <button type="button" onClick={handleFilterSubmit}>Pesquisar</button>
            </div>
            <PaginationTable data={filteredResultados} columns={columns} itemsPerPage={6} onEyeClick={handleEyeClick} onCancelClick={handleCancelClick} onViewClick={handleViewClick} showActions={false} />
          </div>
        )}
      </form>
      <Modal show={showModal} onClose={handleCloseModal} modalContent={modalContent} endereco={endereco} detalhesAgendamento={detalhesAgendamento} />
    </div>
  );
}

export default AgendaCliente;