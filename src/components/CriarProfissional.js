import React, { useState } from 'react'; // Importando useState
import { useNavigate } from 'react-router-dom'; // Importando useNavigate
import '../styles/CriarProfissional.css';
import ToastrService from '../utils/ToastrService'; // Importando o ToastrService
import { useUser } from '../context/UserContext'; // Importando o contexto do usuário
import { criarProfissional } from '../services/admin/profissionalService'; // Importando o serviço para criar profissional
import fetchCepData from '../services/cepApi'; // Importando a nova função

function CriarProfissional() {
  const navigate = useNavigate(); // Inicializando o hook useNavigate
  const { user } = useUser(); // Obtendo o usuário do contexto
  const [step, setStep] = useState(1); // Estado para controlar o passo atual do cadastro
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    cpf: '',
    celular: '',
    adminId: user ? user.id : null, // Pega o adminId do usuário logado ou null se não estiver logado
    enderecos: [{
      cep: '',
      logradouro: '',
      numero: '', // Inicializa como string vazia
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      pais: 'Brasil'
    }],
    especialidades: [], // Inicializa como um array vazio
    senha: ''
  });
  const [selectedSpecialty, setSelectedSpecialty] = useState(''); // Estado para a especialidade selecionada

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'especialidades') {
      setFormData(prevState => ({
        ...prevState,
        especialidades: Array.from(e.target.selectedOptions, option => option.value) // Atualiza as especialidades selecionadas
      }));
    } else if (name === 'numero') { // Verifica se o campo é o número do endereço
      setFormData(prevState => ({
        ...prevState,
        enderecos: [{ ...prevState.enderecos[0], numero: value }] // Atualiza o número do endereço
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddSpecialty = () => {
    if (selectedSpecialty && !formData.especialidades.some(s => s.especialidades === selectedSpecialty)) {
      setFormData(prevState => ({
        ...prevState,
        especialidades: [...prevState.especialidades, { especialidades: selectedSpecialty }] // Adiciona a especialidade no formato correto
      }));
      setSelectedSpecialty(''); // Limpa a seleção
      ToastrService.showNotification('success', 'Especialidade adicionada!'); // Mensagem de sucesso
    } else {
      ToastrService.showNotification('error', 'Selecione uma especialidade válida.'); // Mensagem de erro
    }
  };

  const handleNextStep = () => {
    setStep(step + 1); // Avança para o próximo passo
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.adminId) { // Verifica se adminId é null
      ToastrService.showNotification('error', 'É necessário estar logado para isso.'); // Mensagem de erro
      return; // Fecha o formulário
    }
    try {
      const response = await criarProfissional(formData); // Chama o serviço para criar o profissional
      console.log('Profissional criado com sucesso:', response); // Exibe a resposta da API
      ToastrService.showNotification('success', 'Profissional criado com sucesso!'); // Mensagem de sucesso
      navigate('/admin'); // Redireciona para a tela /admin
    } catch (error) {
      console.error('Erro ao criar profissional:', error); // Tratamento de erro
      ToastrService.showNotification('error', 'Erro ao criar profissional.'); // Mensagem de erro
    }
  };

  const handleCepChange = async (e) => {
    const { value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      enderecos: [{ ...prevState.enderecos[0], cep: value }]
    }));

    if (value.length === 8) { // Verifica se o CEP tem 8 dígitos
      try {
        const data = await fetchCepData(value); // Chama a nova função para buscar dados do CEP
        if (!data.erro) {
          setFormData(prevState => ({
            ...prevState,
            enderecos: [{
              ...prevState.enderecos[0],
              logradouro: data.logradouro,
              bairro: data.bairro,
              cidade: data.localidade,
              estado: data.uf
            }]
          }));
        } else {
          ToastrService.showNotification('error', 'CEP não encontrado.'); // Mensagem de erro
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        ToastrService.showNotification('error', 'Erro ao buscar CEP.'); // Mensagem de erro
      }
    }
  };

  return (
    <div className="criar-profissional-panel">
      <h2>Criar Profissional</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && ( // Passo 1: Dados pessoais
          <>
            <h4>Dados Pessoais</h4>
            <input type="text" name="nome" placeholder="Nome" onChange={handleInputChange} required />
            <input type="text" name="sobrenome" placeholder="Sobrenome" onChange={handleInputChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleInputChange} required />
            <input type="text" name="cpf" placeholder="CPF" onChange={handleInputChange} required />
            <input type="text" name="celular" placeholder="Celular" onChange={handleInputChange} required />
            <button type="button" onClick={handleNextStep}>Próximo</button> {/* Avança para o próximo passo */}
          </>
        )}
        {step === 2 && ( // Passo 2: Endereço
          <>
            <h4>Endereco</h4>
            <input type="text" name="cep" placeholder="CEP" onChange={handleCepChange} required />
            <input type="text" name="logradouro" placeholder="Logradouro" value={formData.enderecos[0].logradouro} onChange={handleInputChange} required />
            <input type="text" name="numero" placeholder="Número" value={formData.enderecos[0].numero} onChange={handleInputChange} required /> {/* Campo para o número do endereço */}
            <input type="text" name="complemento" placeholder="Complemento" onChange={handleInputChange} />
            <input type="text" name="bairro" placeholder="Bairro" value={formData.enderecos[0].bairro} onChange={handleInputChange} required />
            <input type="text" name="cidade" placeholder="Cidade" value={formData.enderecos[0].cidade} onChange={handleInputChange} required />
            <input type="text" name="estado" placeholder="Estado" value={formData.enderecos[0].estado} onChange={handleInputChange} required />
            <button type="button" onClick={handleNextStep}>Próximo</button> {/* Avança para o próximo passo */}
          </>
        )}
        {step === 3 && ( // Passo 3: Especialidades
          <>
            <h4>Especialidade</h4>
            <select name="especialidade" onChange={(e) => setSelectedSpecialty(e.target.value)} required>
              <option value="">Selecione uma especialidade</option>
              {['CARDIOLOGISTA', 'DERMATOLOGISTA', 'ENDOCRINOLOGISTA', 'GINECOLOGISTA', 'NEUROLOGISTA', 'OFTALMOLOGISTA', 'ORTOPEDISTA', 'OTORRINOLARINGOLOGISTA', 'PEDIATRA', 'PSIQUIATRA', 'UROLOGISTA'].map((especialidade) => (
                <option key={especialidade} value={especialidade}>
                  {especialidade}
                </option>
              ))}
            </select>
            <button type="button" onClick={handleAddSpecialty}>Incluir Outra Especialidade</button> {/* Adiciona a especialidade selecionada */}
            <div>
              <h5>Especialidades Selecionadas:</h5>
              <ul>
                {formData.especialidades.map((especialidade, index) => (
                  <li key={index} className="especialidade-item">{especialidade.especialidades}</li>
                ))}
              </ul>
            </div>
            <button type="button" onClick={handleNextStep}>Próximo</button> {/* Avança para o próximo passo */}
          </>
        )}
        {step === 4 && ( // Passo 4: Senha
          <>
            <h4>Senha de Acesso</h4>
            <input type="password" name="senha" placeholder="Senha" onChange={handleInputChange} required />
            <button type="submit">Criar Profissional</button> {/* Envia o formulário */}
          </>
        )}
      </form>
      <div className="charts-container">
      </div>
    </div>
  );
}

export default CriarProfissional;
