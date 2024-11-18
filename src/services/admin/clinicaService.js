import axios from 'axios';

const API_URL = 'http://localhost:8080/clinicas';

export const criarClinica = async (dados) => {
  try {
    const response = await axios.post(API_URL, dados); // Envia os dados para a API
    return response.data; // Retorna a resposta da API
  } catch (error) {
    console.error('Erro ao criar clínica:', error); // Tratamento de erro
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
};

export const buscarClinicasAtivos = async () => {
  try {
    const response = await axios.get('http://localhost:8080/clinicas/ativos'); // Faz a requisição para a API de profissionais ativos
    return response.data.map(data => ({
      id: data.id,
      nomeClinica: data.nomeClinica,
      descricaoClinica: data.descricaoClinica
    })); // Retorna os profissionais ativos com ID, nome e sobrenome
  } catch (error) {
    console.error('Erro ao buscar clinicas ativas:', error); // Tratamento de erro
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
};


export const buscarAgenda = async (clinicaId, nomeEspecialidade) => {
  try {
    const response = await axios.get(`http://localhost:8080/profissionais/agenda?clinicaId=${clinicaId}&nomeEspecialidade=${nomeEspecialidade}`);
    return response.data; // Retorna a agenda
  } catch (error) {
    console.error('Erro ao buscar agenda:', error); // Tratamento de erro
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
};

export const buscarEspecialidadesClinica = async (clinicaId) => {
  try {
    const response = await axios.get(`http://localhost:8080/clinicas/especialidadesClinica?clinicaId=${clinicaId}`); // Faz a requisição para a API de especialidades do profissional
    return response.data.map(data => ({
      id: data.id,
      nomeEspecialidade: data.especialidades // Renomeia a propriedade
    })); // Retorna as especialidades do profissional com ID e nome
  } catch (error) {
    console.error('Erro ao buscar especialidades do profissional:', error); // Tratamento de erro
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
}


export const buscarEnderecoClinica = async (clinicaId) => {
  try {
    const response = await axios.get(`http://localhost:8080/clinicas/endereco?clinicaId=${clinicaId}`); // Faz a requisição para a API de endereço da clínica
    return response.data; // Retorna o endereço da clínica
  } catch (error) {
    console.error('Erro ao buscar endereço da clínica:', error); // Tratamento de erro
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
};


export const buscarProfissionaisClinica = async (clinicaId) => {
  try {
    const response = await axios.get(`http://localhost:8080/profissionais-clinica/clinica-detalhado?clinicaId=${clinicaId}`);
    return response.data.map(data => ({
      id: data.id,
      nomeProfissional: data.nomeProfissional
    }));
  } catch (error) {
    console.error('Erro ao buscar profissionais da clínica:', error);
    throw error;
  }
};