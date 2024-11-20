import React, { useState, useEffect } from 'react';
import ToastrService from '../utils/ToastrService';
import { useNavigate } from 'react-router-dom';
import { buscarClinicasAtivos, IncluirProfissionalNaClinica } from '../services/admin/clinicaService';
import { buscarProfissionaisAtivos } from '../services/admin/profissionalService';
import '../styles/IncluirProfissional.css';

function IncluirProfissional() {
  const [clinicas, setClinicas] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [selectedClinica, setSelectedClinica] = useState('');
  const [selectedProfissional, setSelectedProfissional] = useState('');

  useEffect(() => {
    buscarClinicasAtivos()
      .then(response => setClinicas(response))
      .catch(error => ToastrService.error('Erro ao buscar clínicas'));

    buscarProfissionaisAtivos()
      .then(response => setProfissionais(response))
      .catch(error => ToastrService.error('Erro ao buscar profissionais'));
  }, []);

  const handleVincular = () => {
    if (selectedClinica && selectedProfissional) {
      IncluirProfissionalNaClinica(selectedClinica, selectedProfissional)
        .then(() => ToastrService.success('Profissional vinculado com sucesso!'))
        .catch(error => ToastrService.error('Erro ao vincular profissional'));
    } else {
      ToastrService.error('Selecione uma clínica e um profissional');
    }
  };

  return (
    <div className="criar-profissional-panel">
      <div>
        <label htmlFor="clinica-select">Selecione a Clínica:</label>
        <select
          id="clinica-select"
          value={selectedClinica}
          onChange={(e) => setSelectedClinica(e.target.value)}
        >
          <option value="">Selecione uma clínica</option>
          {clinicas.map((clinica) => (
            <option key={clinica.id} value={clinica.id}>
              {clinica.nomeClinica}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="profissional-select">Selecione o Profissional:</label>
        <select
          id="profissional-select"
          value={selectedProfissional}
          onChange={(e) => setSelectedProfissional(e.target.value)}
        >
          <option value="">Selecione um profissional</option>
          {profissionais.map((profissional) => (
            <option key={profissional.id} value={profissional.id}>
              {profissional.nome} {profissional.sobrenome}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleVincular}>Vincular Profissional</button>
    </div>
  );
}

export default IncluirProfissional;