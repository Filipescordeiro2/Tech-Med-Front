import axios from 'axios';

const ADMIN_API_URL = 'http://localhost:8080/adm/autenticar';
const CLIENT_API_URL = 'http://localhost:8080/clientes/autenticar';
const PROFESSIONAL_API_URL = 'http://localhost:8080/profissionais/autenticar';

export const authenticateAdmin = async (loginData) => {
  try {
    const response = await axios.post(ADMIN_API_URL, loginData);
    return response.data; // Retorna os dados da resposta
  } catch (error) {
    throw error.response ? error.response.data : new Error('Erro ao autenticar');
  }
};

export const authenticateClient = async (loginData) => {
  try {
    const response = await axios.post(CLIENT_API_URL, loginData);
    return response.data; // Retorna os dados da resposta
  } catch (error) {
    throw error.response ? error.response.data : new Error('Erro ao autenticar');
  }
};

export const authenticateProfessional = async (loginData) => {
  try {
    const response = await axios.post(PROFESSIONAL_API_URL, loginData);
    return response.data; // Retorna os dados da resposta
  } catch (error) {
    throw error.response ? error.response.data : new Error('Erro ao autenticar');
  }
};