import React, { useState } from 'react';
import ModalAgendamento from '../utils/ModalAgendamento';
import '../styles/PaginationTable.css'; // Importa o arquivo CSS para estilização

const PaginationTable = ({ data, columns, itemsPerPage, onEyeClick, onCancelClick, onViewClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModalAgendamento, setShowModalAgendamento] = useState(false);
  const [selectedAgendaId, setSelectedAgendaId] = useState(null);

  // Calcula os dados para a página atual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Muda de página
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRealizarAgendamentoClick = (agendaId) => {
    setSelectedAgendaId(agendaId);
    setShowModalAgendamento(true);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              column.accessor !== 'codigoAgenda' && <th key={index}>{column.header}</th>
            ))}
            <th>Ações</th> {/* Adiciona a coluna de ações */}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              {columns.map((column, colIndex) => (
                column.accessor !== 'codigoAgenda' && <td key={colIndex}>{item[column.accessor]}</td>
              ))}
              <td className="actions-column">
                <button onClick={() => onEyeClick(item.codigoClinica)} style={{ cursor: 'pointer', marginRight: '10px' }}>Endereço Clínica</button>
                <button onClick={() => onCancelClick(item.codigoAgenda)} style={{ cursor: 'pointer', marginRight: '10px' }}>Cancelar</button>
                <button 
                  onClick={() => item.statusAgenda !== 'AGENDADO' ? handleRealizarAgendamentoClick(item.codigoAgenda) : onViewClick(item.codigoAgenda)} 
                  style={{ cursor: 'pointer' }}
                  className={item.statusAgenda !== 'AGENDADO' ? 'realizar-agendamento' : 'visualizar-agendamento'}
                >
                  {item.statusAgenda !== 'AGENDADO' ? 'Realizar Agendamento' : 'Visualizar Agendamento'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
      <ModalAgendamento 
        show={showModalAgendamento} 
        onClose={() => setShowModalAgendamento(false)} 
        agendaId={selectedAgendaId} 
      />
    </div>
  );
};

export default PaginationTable;