import axios from 'axios';

const API_URL = 'http://localhost:8080/agendas'; // URL da API de agendas
const AGENDAMENTOS_URL = 'http://localhost:8080/agendamentos'; // URL da API de agendamentos

export const cancelarAgenda = async (agendaId) => {
  try {
    const response = await axios.patch(`${API_URL}/cancelarAgenda?agendaId=${agendaId}`); // Faz a requisição para cancelar a agenda
    return response.data; // Retorna a resposta da API
  } catch (error) {
    console.error('Erro ao cancelar agenda:', error); // Tratamento de erro
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
};

export const obterDetalhesAgendamento = async (agendaId) => {
  try {
    const response = await axios.get(`${AGENDAMENTOS_URL}/detalhado?agendaId=${agendaId}`); // Faz a requisição para obter os detalhes do agendamento
    return response.data; // Retorna a resposta da API
  } catch (error) {
    console.error('Erro ao obter detalhes do agendamento:', error); // Tratamento de erro
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
};