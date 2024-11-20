import React, { useState } from 'react';
import { FaFileMedical } from 'react-icons/fa'; // Importando o ícone
import ToastrService from '../utils/ToastrService';
import { useNavigate } from 'react-router-dom';
import prontuarioService from '../services/admin/prontuarioService';
import '../styles/ProtuarioMedico.css';

function ProtuarioMedico() {
  const [cpf, setCpf] = useState('');
  const [data, setData] = useState('');
  const [profissional, setProfissional] = useState('');
  const [prontuarios, setProntuarios] = useState([]);
  const [selectedProntuario, setSelectedProntuario] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const fetchedProntuarios = await prontuarioService.getProntuarioByCpf(cpf);
      setProntuarios(fetchedProntuarios);
      ToastrService.success('Prontuários carregados com sucesso!');
      setShowFilters(true);
    } catch (error) {
      ToastrService.error('Erro ao carregar prontuários.');
    }
  };

  const handleProntuarioClick = (prontuario) => {
    const url = `/prontuario/${prontuario.id}`;
    window.open(url, '_blank');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProntuario(null);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  const filteredProntuarios = prontuarios.filter(prontuario =>
    `${prontuario.profissionalNome} ${prontuario.profissionalSobrenome}`.toLowerCase().includes(profissional.toLowerCase()) &&
    prontuario.dataConsulta.includes(data)
  );

  return (
    <div className="criar-profissional-panel">
      <h2>Consultar Prontuário do Paciente</h2>
      <form className="filter-container" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
        <label htmlFor="cpf">CPF do Paciente:</label>
        <input
          type="text"
          id="cpf"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          placeholder="Digite o CPF"
        />
        <button type="submit">Pesquisar</button>
      </form>
      {showFilters && (
        <form className="filter-container">
          <label htmlFor="data">Data:</label>
          <input
            type="date"
            id="data"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          <label htmlFor="profissional">Profissional:</label>
          <input
            type="text"
            id="profissional"
            value={profissional}
            onChange={(e) => setProfissional(e.target.value)}
            placeholder="Nome do Profissional"
          />
        </form>
      )}
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Profissional</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredProntuarios.map((prontuario) => (
            <tr key={prontuario.id}>
              <td>{formatDate(prontuario.dataConsulta)}</td>
              <td>Dr(a) {`${prontuario.profissionalNome} ${prontuario.profissionalSobrenome}`}</td>
              <td>
                <div className="prontuario-acao" onClick={() => handleProntuarioClick(prontuario)}>
                  <FaFileMedical /> Prontuário Médico
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProtuarioMedico;