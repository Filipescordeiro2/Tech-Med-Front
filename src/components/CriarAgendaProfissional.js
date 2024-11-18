import React, { useState, useEffect } from 'react';
import { buscarClinicas, buscarProfissionais, buscarEspecialidades, criarAgenda } from '../services/admin/profissionalService'; // Importa as funções para buscar clínicas, profissionais, especialidades e criar agenda
import ToastrService from '../utils/ToastrService'; // Importa a instância do ToastrService
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate

function CriarAgenadaProfissional() {
  const navigate = useNavigate(); // Inicializa o hook useNavigate
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [clinicas, setClinicas] = useState([]); // Estado para armazenar as clínicas
  const [profissionais, setProfissionais] = useState([]); // Estado para armazenar os profissionais
  const [especialidades, setEspecialidades] = useState([]); // Estado para armazenar as especialidades

  useEffect(() => {
    const fetchClinicas = async () => {
      try {
        const clinicasData = await buscarClinicas(); // Chama a função para buscar clínicas
        console.log(clinicasData); // Verifica os dados retornados
        setClinicas(clinicasData); // Armazena as clínicas no estado
      } catch (error) {
        console.error('Erro ao buscar clínicas:', error); // Tratamento de erro
        ToastrService.showNotification('error', 'Erro ao buscar clínicas'); // Notificação de erro
      }
    };

    fetchClinicas(); // Executa a função ao montar o componente
  }, []);

  const handleNextStep = async () => {
    if (step === 1) {
      const clinicaId = formData.clinica; // Obtém o ID da clínica selecionada
      if (clinicaId) {
        try {
          const profissionaisData = await buscarProfissionais(clinicaId); 
          console.log(profissionaisData); // Verifica os dados retornados
          setProfissionais(profissionaisData); // Armazena os profissionais no estado
        } catch (error) {
          console.error('Erro ao buscar profissionais:', error); // Tratamento de erro
          ToastrService.showNotification('error', 'Erro ao buscar profissionais'); // Notificação de erro
        }
      }
    } else if (step === 2) {
      const profissionalId = formData.profissional; // Obtém o ID do profissional selecionado
      if (profissionalId) {
        try {
          const especialidadesData = await buscarEspecialidades(profissionalId); // Chama a função para buscar especialidades
          console.log(especialidadesData); // Verifica os dados retornados
          setEspecialidades(especialidadesData); // Armazena as especialidades no estado
        } catch (error) {
          console.error('Erro ao buscar especialidades:', error); // Tratamento de erro
          ToastrService.showNotification('error', 'Erro ao buscar especialidades'); // Notificação de erro
        }
      }
    }
    setStep(step + 1); // Avança para o próximo passo
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    const { clinica, profissional, especialidade, periodo, data } = formData; // Obtém os dados do formulário

    try {
      const response = await criarAgenda(clinica, profissional, especialidade, periodo, data); // Chama a função para criar a agenda
      
      // Verifica se a resposta contém um campo de erro
      if (response.error) {
        ToastrService.showNotification('error', response.error); // Notificação de erro com a mensagem da resposta
      } else {
        console.log('Agenda criada com sucesso:', response); // Sucesso
        ToastrService.showNotification('success', 'Agenda criada com sucesso!'); // Notificação de sucesso
        navigate('/admin'); // Redireciona para a página /admin
      }
    } catch (error) {
      console.error('Erro ao criar agenda:', error); // Tratamento de erro
      ToastrService.showNotification('error', 'Erro ao criar agenda'); // Notificação de erro
    }
  };


  return (
    <div className="criar-profissional-panel">
      <h2>Criar Agenda Profissional</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <h4>Selecionar Clínica</h4>
            <select name="clinica" onChange={handleInputChange} required>
              <option value="">Selecione uma clínica</option>
              {clinicas.map((clinica, index) => (
                <option key={index} value={clinica.id}>{clinica.nomeClinica}</option>
              ))}
            </select>
            <button type="button" onClick={handleNextStep}>Próximo</button>
          </>
        )}
        {step === 2 && (
          <>
            <h4>Selecionar Profissional</h4>
            <select name="profissional" onChange={handleInputChange} required>
              <option value="">Selecione um profissional</option>
              {profissionais.map((profissional, index) => (
                <option key={index} value={profissional.id}>{profissional.nomeProfissional}</option>
              ))}
            </select>
            <button type="button" onClick={handleNextStep}>Próximo</button>
          </>
        )}
        {step === 3 && (
          <>
            <h4>Selecionar Especialidade</h4>
            <select name="especialidade" onChange={handleInputChange} required>
              <option value="">Selecione uma especialidade</option>
              {especialidades.map((especialidade, index) => (
                <option key={index} value={especialidade.id}>{especialidade.nomeEspecialidade}</option>
              ))}
            </select>
            <button type="button" onClick={handleNextStep}>Próximo</button>
          </>
        )}
        {step === 4 && (
          <>
            <h4>Selecionar Período</h4>
            <select name="periodo" onChange={handleInputChange} required>
              <option value="">Selecione um período</option>
              <option value="MANHA">MANHÃ</option>
              <option value="TARDE">TARDE</option>
              <option value="NOITE">NOITE</option>
              <option value="INTEGRAL">INTEGRAL</option>
            </select>
            <h4>Selecionar Data</h4>
            <input type="date" name="data" onChange={handleInputChange} required /> {/* Campo de data */}
            <button type="submit">Criar Agenda</button>
          </>
        )}
      </form>
    </div>
  );
}

export default CriarAgenadaProfissional;
