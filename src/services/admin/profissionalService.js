import axios from 'axios';

const API_URL = 'http://localhost:8080/profissionais'; // URL da API
const CLINICAS_URL = 'http://localhost:8080/clinicas'; // URL da API de clínicas

export const criarProfissional = async (dados) => {
  try {
    const response = await axios.post(API_URL, dados); // Envia os dados para a API
    return response.data; // Retorna a resposta da API
  } catch (error) {
    console.error('Erro ao criar profissional:', error); // Tratamento de erro
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
};

// Nova função para buscar clínicas
export const buscarClinicas = async () => {
  try {
    const response = await axios.get(CLINICAS_URL); // Faz a requisição para a API de clínicas
    // Retorna um array de objetos com id e nomeClinica
    return response.data.map(data => ({ id: data.id, nomeClinica: data.nomeClinica })); 
  } catch (error) {
    console.error('Erro ao buscar clínicas:', error); // Tratamento de erro
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
};

export const buscarProfissionais = async (clinicaId) => {
  try {
    const response = await axios.get(`http://localhost:8080/profissionais-clinica/clinica-detalhado?clinicaId=${clinicaId}`); // Faz a requisição para a API de profissionais
    return response.data.map(data => ({ id: data.id, nomeProfissional: data.nomeProfissional })); // Retorna os profissionais com ID e nome
  } catch (error) {
    console.error('Erro ao buscar profissionais:', error); // Tratamento de erro
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
};

export const buscarEspecialidades = async (profissionalId) => {
  try {
    const response = await axios.get(`http://localhost:8080/profissionais/especialidadesProfissional?profissionalId=${profissionalId}`);
    // Ajuste a estrutura para retornar id e nomeEspecialidade
    return response.data.map(data => ({
      id: data.id,
      nomeEspecialidade: data.especialidades // Renomeia a propriedade
    }));
  } catch (error) {
    console.error('Erro ao buscar especialidades:', error);
    throw error;
  }
};

export const criarAgenda = async (clinicaId, profissionalId, especialidadeId, periodo, data) => {
  let url = '';
  switch (periodo) {
    case 'MANHA':
      url = 'http://localhost:8080/agendas/gerarManha';
      break;
    case 'TARDE':
      url = 'http://localhost:8080/agendas/gerarTarde';
      break;
    case 'NOITE':
      url = 'http://localhost:8080/agendas/gerarNoite';
      break;
    case 'INTEGRAL':
      url = 'http://localhost:8080/agendas/gerar';
      break;
    default:
      throw new Error('Período inválido'); // Tratamento de erro
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      clinicaId,
      profissionalId,
      especialidadeId,
      data, // Adiciona a data ao corpo da requisição
    }),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar agenda');
  }

  return await response.json(); // Retorna os dados da resposta
};

export const buscarProfissionaisAtivos = async () => {
  try {
    const response = await axios.get('http://localhost:8080/profissionais/ativos'); // Faz a requisição para a API de profissionais ativos
    return response.data.map(data => ({
      id: data.id,
      nome: data.nome,
      sobrenome: data.sobrenome
    })); // Retorna os profissionais ativos com ID, nome e sobrenome
  } catch (error) {
    console.error('Erro ao buscar profissionais ativos:', error); // Tratamento de erro
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
};

export const buscarClinicasVinculadas = async (profissionalId) => {
  try {
    const response = await axios.get(`http://localhost:8080/profissionais-clinica/profissional-detalhado?profissionalId=${profissionalId}`); // Faz a requisição para a API de clínicas vinculadas ao profissional
    return response.data.map(data => ({
      id: data.id,
      nomeClinica: data.nomeclinica,
      nomeProfissional: data.nomeProfissional
    })); // Retorna as clínicas vinculadas com ID, nome da clínica e nome do profissional
  } catch (error) {
    console.error('Erro ao buscar clínicas vinculadas:', error); // Tratamento de erro
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
};

export const buscarEspecialidadesProfissional = async (profissionalId) => {
  try {
    const response = await axios.get(`http://localhost:8080/profissionais/especialidadesProfissional?profissionalId=${profissionalId}`); // Faz a requisição para a API de especialidades do profissional
    return response.data.map(data => ({
      id: data.id,
      nomeEspecialidade: data.especialidades // Renomeia a propriedade
    })); // Retorna as especialidades do profissional com ID e nome
  } catch (error) {
    console.error('Erro ao buscar especialidades do profissional:', error); // Tratamento de erro
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
};

export const buscarAgenda = async (profissionalId, clinicaId, nomeEspecialidade) => {
  try {
    const response = await axios.get(`http://localhost:8080/profissionais/agenda?profissionalId=${profissionalId}&clinicaId=${clinicaId}&nomeEspecialidade=${nomeEspecialidade}`); // Faz a requisição para a API de agenda
    return response.data; // Retorna a agenda
  } catch (error) {
    console.error('Erro ao buscar agenda:', error); // Tratamento de erro
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
};

export const buscarEnderecoClinica = async (clinicaId) => {
  try {
    const response = await axios.get(`http://localhost:8080/clinicas/endereco?clinicaId=${clinicaId}`); // Faz a requisição para a API de endereço da clínica
    return response.data; // Retorna o endereço da clínica
  } catch (error) {
    console.error('Erro ao buscar endereço da clínica:', error); // Tratamento de erro
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
};

