import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import prontuarioService from '../../services/admin/prontuarioService';
import Prontuario from '../../components/Prontuario';
import '../../styles/Prontuario.css';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

function ProntuarioPage() {
  const { id } = useParams();
  const [prontuario, setProntuario] = useState(null);

  useEffect(() => {
    const fetchProntuario = async () => {
      try {
        const fetchedProntuario = await prontuarioService.getProntuarioById(id);
        if (Array.isArray(fetchedProntuario) && fetchedProntuario.length > 0) {
          setProntuario(fetchedProntuario[0]);
        } else {
          setProntuario(null);
        }
      } catch (error) {
        console.error('Erro ao carregar prontuário:', error);
      }
    };

    fetchProntuario();
  }, [id]);

  if (!prontuario) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="profissional-home">
      <Header />
      <br />
      <div className="main-content">
        <Sidebar />
        <Prontuario prontuario={prontuario} />
      </div>
    </div>
  );
}

export default ProntuarioPage;