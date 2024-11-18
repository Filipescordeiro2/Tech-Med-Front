// Aqui você pode configurar suas chamadas de API
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://api.techmed.com', // URL da sua API
});

export default api;
