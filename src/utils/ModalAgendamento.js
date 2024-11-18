import React, { useState } from 'react';
import axios from 'axios';
import ToastrService from './ToastrService';
import '../styles/Modal.css'; // Importa o arquivo CSS para estilização

const ModalAgendamento = ({ show, onClose, agendaId }) => {
  const [cpf, setCpf] = useState('');
  const [cliente, setCliente] = useState(null);

  const handleBuscarCliente = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/clientes/buscarPorCpf?cpf=${cpf}`);
      setCliente(response.data);
    } catch (error) {
      ToastrService.showNotification('error', 'Erro ao buscar cliente');
    }
  };

  const handleCriarAgendamento = async () => {
    try {
      await axios.post('http://localhost:8080/agendamentos', {
        agendaId: agendaId,
        clienteId: cliente.id
      });
      ToastrService.showNotification('success', 'Agendamento criado com sucesso');
      onClose();
    } catch (error) {
      ToastrService.showNotification('error', 'Erro ao criar agendamento');
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Realizar Agendamento</h2>
        <div>
          <label>CPF do Cliente:</label>
          <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} />
          <button onClick={handleBuscarCliente}>Buscar Cliente</button>
        </div>
        {cliente && (
          <div>
            <h3>Dados do Cliente</h3>
            <p><strong>Nome:</strong> {cliente.nome}</p>
            <p><strong>Sobrenome:</strong> {cliente.sobrenome}</p>
            <p><strong>Email:</strong> {cliente.email}</p>
            <p><strong>Celular:</strong> {cliente.celular}</p>
            <button onClick={handleCriarAgendamento}>Criar Agendamento</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalAgendamento;