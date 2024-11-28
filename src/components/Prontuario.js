import React from 'react';
import { FaFilePdf } from 'react-icons/fa'; // Importando o ícone de PDF
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../styles/Prontuario.css';

function Prontuario({ prontuario }) {
  if (!prontuario) {
    return <div>Carregando...</div>;
  }

  console.log('Prontuário recebido:', prontuario);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  const generatePDF = () => {
    const input = document.getElementById('prontuario-content');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape');
      const imgWidth = 297;
      const pageHeight = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('prontuario.pdf');
    });
  };

  return (
    <div className="criar-profissional-panel" id="prontuario-content">
      <h2>Prontuário Completo</h2>
      <p><strong>Paciente:</strong> {`${prontuario.clienteNome} ${prontuario.clienteSobrenome}`}</p>
      <p><strong>Idade:</strong> {prontuario.idade}</p>
      <p><strong>Data de Nascimento:</strong> {formatDate(prontuario.dataNascimento)}</p>
      <hr /> {/* Linha horizontal para separar os dados pessoais dos dados da consulta */}
      <p><strong>Data da Consulta:</strong> {formatDate(prontuario.dataConsulta)}</p>
      <p><strong>Clinica:</strong> {`${prontuario.clinicaNome}`}</p>
      <p><strong>Dr (a):</strong> {`${prontuario.profissionalNome} ${prontuario.profissionalSobrenome}`}</p>
      <p><strong>Relatorio da Consulta:</strong></p>
      <div className="descricao-caixa">
        {prontuario.descricao}
      </div>
      <h3>🧪 Exames</h3>
      <ul>
        {prontuario.exames && prontuario.exames.map((exame) => (
          <li key={exame.id}>{exame.exame}</li>
        ))}
      </ul>
      <h3>🛠️ Procedimentos</h3>
      <ul>
        {prontuario.procedimentos && prontuario.procedimentos.map((procedimento) => (
          <li key={procedimento.id}>{procedimento.procedimento}</li>
        ))}
      </ul>
      <h3>💊 Medicamentos</h3>
      <ul>
        {prontuario.medicamentos && prontuario.medicamentos.map((medicamento) => (
          <li key={medicamento.id}>{medicamento.medicamento}</li>
        ))}
      </ul>
      <div className="assinatura-eletronica">
        <p><strong>Assinatura Eletrônica do Profissional:</strong></p>
        <p>{`${prontuario.profissionalNome} ${prontuario.profissionalSobrenome}`}</p>
        <p>{`${prontuario.orgaoRegulador} - ${prontuario.numeroRegistro} / ${prontuario.ufRegistro}`}</p>
        <p>{formatDate(prontuario.dataConsulta)}</p>
      </div>
      <button className="pdf-button" onClick={generatePDF}>
        <FaFilePdf /> Gerar PDF
      </button>
    </div>
  );
}

export default Prontuario;