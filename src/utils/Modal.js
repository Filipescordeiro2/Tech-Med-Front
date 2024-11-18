import React from 'react';
import '../styles/Modal.css'; // Importa o arquivo CSS para estilização

const Modal = ({ show, onClose, modalContent, endereco, detalhesAgendamento }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        {modalContent === 'endereco' && endereco && (
          <div>
            <h2>Endereço da Clínica</h2>
            <p><strong>CEP:</strong> {endereco.cep}</p>
            <p><strong>Logradouro:</strong> {endereco.logradouro}</p>
            <p><strong>Número:</strong> {endereco.numero}</p>
            <p><strong>Complemento:</strong> {endereco.complemento}</p>
            <p><strong>Bairro:</strong> {endereco.bairro}</p>
            <p><strong>Cidade:</strong> {endereco.cidade}</p>
            <p><strong>Estado:</strong> {endereco.estado}</p>
            <p><strong>País:</strong> {endereco.pais}</p>
          </div>
        )}
        {modalContent === 'detalhesAgendamento' && detalhesAgendamento && (
          <div>
            <h2>Detalhes do Cliente Agendado</h2>
            <p><strong>Nome:</strong> {detalhesAgendamento.nomeCliente}</p>
            <p><strong>Sobrenome:</strong> {detalhesAgendamento.sobrenomeCliente}</p>
            <p><strong>Email:</strong> {detalhesAgendamento.emailCliente}</p>
            <p><strong>Celular:</strong> {detalhesAgendamento.celularCliente}</p>
            <p><strong>CPF:</strong> {detalhesAgendamento.cpfCliente}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;