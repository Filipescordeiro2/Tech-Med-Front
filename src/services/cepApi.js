const fetchCepData = async (cep) => {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
    throw error; // Repassa o erro para tratamento posterior
  }
};

export default fetchCepData;
