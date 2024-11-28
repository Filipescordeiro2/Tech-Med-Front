import axios from 'axios';

const AGENDAMENTOS_URL = 'http://localhost:8080/agendamentos'; // URL da API de agendamentos
const CLIENTES_URL = 'http://localhost:8080/clientes'; // URL da API de clientes


export const buscarAgendamentoPorCpf = async (cpf) => {
  try {
    const response = await axios.get(`${AGENDAMENTOS_URL}/detalhadoPorCpf?cpf=${cpf}`); // Faz a requisição para obter o agendamento pelo CPF
    return response.data; // Retorna a resposta da API
  } catch (error) {
    console.error('Erro ao buscar agendamento por CPF:', error); // Tratamento de erro
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
}; 

export const buscarClientePorCpf = async (cpf) => {
  try {
    const response = await axios.get(`${CLIENTES_URL}/buscarPorCpf?cpf=${cpf}`); // Faz a requisição para obter o cliente pelo CPF
    return response.data; // Retorna a resposta da API
  } catch (error) {
    console.error('Erro ao buscar cliente por CPF:', error); // Tratamento de erro
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
};

export const atualizarCliente = async (id, cliente) => {
  try {
    const response = await axios.put(`${CLIENTES_URL}/atualizar/${id}`, cliente); // Faz a requisição para atualizar o cliente
    return response.data; // Retorna a resposta da API
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error); // Tratamento de erro
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
};