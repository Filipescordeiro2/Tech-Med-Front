import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Importando axios
import '../styles/DashboardPanel.css';

function DashboardPanel() {
  const [clientesCount, setClientesCount] = useState(0); // Estado para armazenar a quantidade de clientes
  const [profissionaisCount, setProfissionaisCount] = useState(0); // Estado para armazenar a quantidade de profissionais
  const [clinicasCount, setClinicasCount] = useState(0); // Estado para armazenar a quantidade de clínicas
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [error, setError] = useState(null); // Estado para armazenar erros

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const clientesResponse = await axios.get('http://localhost:8080/clientes/contar');
        console.log('Resposta da API de Clientes:', clientesResponse.data);
        setClientesCount(clientesResponse.data);

        const profissionaisResponse = await axios.get('http://localhost:8080/profissionais/contar');
        console.log('Resposta da API de Profissionais:', profissionaisResponse.data);
        setProfissionaisCount(profissionaisResponse.data);

        const clinicasResponse = await axios.get('http://localhost:8080/clinicas/contar');
        console.log('Resposta da API de Clínicas:', clinicasResponse.data);
        setClinicasCount(clinicasResponse.data);
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar a quantidade de clientes, profissionais e clínicas.');
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="dashboard-panel">
      <p>Principais Números:</p>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="panel-stats">
          <div className="stat-item">
            <i className="fas fa-user-friends"></i> {/* Ícone de Clientes */}
            <span>{clientesCount}</span>
            <p>Clientes</p>
          </div>
          <div className="stat-item">
            <i className="fas fa-user-md"></i> {/* Ícone de Profissionais */}
            <span>{profissionaisCount}</span>
            <p>Profissionais</p>
          </div>
          <div className="stat-item">
            <i className="fas fa-hospital"></i> {/* Ícone de Clínicas */}
            <span>{clinicasCount}</span>
            <p>Clínicas</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPanel;
