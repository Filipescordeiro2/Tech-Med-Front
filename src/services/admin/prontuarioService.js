import axios from 'axios';

const API_URL = 'http://localhost:8080/prontuario';

const getProntuarioByCpf = async (cpf) => {
  try {
    const response = await axios.get(`${API_URL}/cliente/cpf?cpf=${cpf}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar prontuário:', error);
    throw error;
  }
};

const getProntuarioById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar prontuário:', error);
    throw error;
  }
};

export default {
  getProntuarioByCpf,
  getProntuarioById,
};