import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CriarClinica.css';
import ToastrService from '../utils/ToastrService';
import { useUser } from '../context/UserContext';
import { criarClinica } from '../services/admin/clinicaService';
import fetchCepData from '../services/cepApi';

function CriarClinica() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nomeClinica: '',
    descricaoClinica: '',
    telefone: '',
    celular: '',
    email: '',
    cnpj: '',
    adminId: user ? user.id : null,
    enderecoClinica: {
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      pais: 'Brasil'
    },
    especialidadeClinica: []
  });
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'especialidadeClinica') {
      setFormData(prevState => ({
        ...prevState,
        especialidadeClinica: Array.from(e.target.selectedOptions, option => ({ especialidades: option.value }))
      }));
    } else if (name in formData.enderecoClinica) {
      setFormData(prevState => ({
        ...prevState,
        enderecoClinica: { ...prevState.enderecoClinica, [name]: value }
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddSpecialty = () => {
    if (selectedSpecialty && !formData.especialidadeClinica.some(s => s.especialidades === selectedSpecialty)) {
      setFormData(prevState => ({
        ...prevState,
        especialidadeClinica: [...prevState.especialidadeClinica, { especialidades: selectedSpecialty }]
      }));
      setSelectedSpecialty('');
      ToastrService.showNotification('success', 'Especialidade adicionada!');
    } else {
      ToastrService.showNotification('error', 'Selecione uma especialidade válida.');
    }
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.adminId) {
      ToastrService.showNotification('error', 'É necessário estar logado para isso.');
      return;
    }
    try {
      const response = await criarClinica(formData);
      console.log('Clínica criada com sucesso:', response);
      ToastrService.showNotification('success', 'Clínica criada com sucesso!');
      navigate('/admin');
    } catch (error) {
      console.error('Erro ao criar clínica:', error);
      ToastrService.showNotification('error', 'Erro ao criar clínica.');
    }
  };

  const handleCepChange = async (e) => {
    const { value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      enderecoClinica: { ...prevState.enderecoClinica, cep: value }
    }));

    if (value.length === 8) {
      try {
        const data = await fetchCepData(value);
        if (!data.erro) {
          setFormData(prevState => ({
            ...prevState,
            enderecoClinica: {
              ...prevState.enderecoClinica,
              logradouro: data.logradouro,
              bairro: data.bairro,
              cidade: data.localidade,
              estado: data.uf
            }
          }));
        } else {
          ToastrService.showNotification('error', 'CEP não encontrado.');
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        ToastrService.showNotification('error', 'Erro ao buscar CEP.');
      }
    }
  };

  return (
    <div className="criar-clinica-panel">
      <h2>Criar Clínica</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <h4>Dados da Clínica</h4>
            <input type="text" name="nomeClinica" placeholder="Nome da Clínica" onChange={handleInputChange} required />
            <input type="text" name="descricaoClinica" placeholder="Descrição da Clínica" onChange={handleInputChange} required />
            <input type="text" name="telefone" placeholder="Telefone" onChange={handleInputChange} required />
            <input type="text" name="celular" placeholder="Celular" onChange={handleInputChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleInputChange} required />
            <input type="text" name="cnpj" placeholder="CNPJ" onChange={handleInputChange} required />
            <button type="button" onClick={handleNextStep}>Próximo</button>
          </>
        )}
        {step === 2 && (
          <>
            <h4>Endereço</h4>
            <input type="text" name="cep" placeholder="CEP" onChange={handleCepChange} required />
            <input type="text" name="logradouro" placeholder="Logradouro" value={formData.enderecoClinica.logradouro} onChange={handleInputChange} required />
            <input type="text" name="numero" placeholder="Número" value={formData.enderecoClinica.numero} onChange={handleInputChange} required />
            <input type="text" name="complemento" placeholder="Complemento" onChange={handleInputChange} />
            <input type="text" name="bairro" placeholder="Bairro" value={formData.enderecoClinica.bairro} onChange={handleInputChange} required />
            <input type="text" name="cidade" placeholder="Cidade" value={formData.enderecoClinica.cidade} onChange={handleInputChange} required />
            <input type="text" name="estado" placeholder="Estado" value={formData.enderecoClinica.estado} onChange={handleInputChange} required />
            <button type="button" onClick={handleNextStep}>Próximo</button>
          </>
        )}
        {step === 3 && (
          <>
            <h4>Especialidades</h4>
            <select name="especialidade" onChange={(e) => setSelectedSpecialty(e.target.value)} required>
              <option value="">Selecione uma especialidade</option>
              {['CARDIOLOGISTA', 'DERMATOLOGISTA', 'ENDOCRINOLOGISTA', 'GINECOLOGISTA', 'NEUROLOGISTA', 'OFTALMOLOGISTA', 'ORTOPEDISTA', 'OTORRINOLARINGOLOGISTA', 'PEDIATRA', 'PSIQUIATRA', 'UROLOGISTA'].map((especialidade) => (
                <option key={especialidade} value={especialidade}>
                  {especialidade}
                </option>
              ))}
            </select>
            <button type="button" onClick={handleAddSpecialty}>Incluir Outra Especialidade</button>
            <div>
              <h5>Especialidades Selecionadas:</h5>
              <ul>
                {formData.especialidadeClinica.map((especialidade, index) => (
                  <li key={index} className="especialidade-item">{especialidade.especialidades}</li>
                ))}
              </ul>
            </div>
            <button type="button" onClick={handleNextStep}>Próximo</button>
          </>
        )}
        {step === 4 && (
          <>
            <button type="submit">Criar Clínica</button>
          </>
        )}
      </form>
    </div>
  );
}

export default CriarClinica;