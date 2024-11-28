import React, { useState } from 'react';
import axios from 'axios';
import ToastrService from '../utils/ToastrService';
import { buscarClientePorCpf, atualizarCliente } from '../services/admin/clienteService';
import '../styles/DadosPaciente.css';

function DadosPaciente() {
  const [cpf, setCpf] = useState('');
  const [cliente, setCliente] = useState(null);
  const [isEditable, setIsEditable] = useState(false);

  const handleCpfSubmit = async (e) => {
    e.preventDefault();
    try {
      const clienteData = await buscarClientePorCpf(cpf);
      setCliente(clienteData);
      ToastrService.success('Cliente encontrado com sucesso!');
    } catch (error) {
      ToastrService.error('Erro ao buscar cliente. Verifique o CPF e tente novamente.');
    }
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSaveClick = async () => {
    try {
      await atualizarCliente(cliente.id, cliente);
      setIsEditable(false);
      ToastrService.success('Dados do cliente atualizados com sucesso!');
    } catch (error) {
      ToastrService.error('Erro ao atualizar cliente. Tente novamente.');
    }
  };

  const handleCepChange = async (e) => {
    const cep = e.target.value;
    setCliente({ ...cliente, enderecoCliente: { ...cliente.enderecoCliente, cep } });

    if (cep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const enderecoData = response.data;
        setCliente({
          ...cliente,
          enderecoCliente: {
            ...cliente.enderecoCliente,
            logradouro: enderecoData.logradouro,
            bairro: enderecoData.bairro,
            cidade: enderecoData.localidade,
            estado: enderecoData.uf,
            complemento: enderecoData.complemento || cliente.enderecoCliente.complemento,
          },
        });
      } catch (error) {
        ToastrService.error('Erro ao buscar endereço. Verifique o CEP e tente novamente.');
      }
    }
  };

  return (
    <div className="dados-cliente-panel">
      <h2>Dados do Cliente</h2>
      <form onSubmit={handleCpfSubmit}>
        <label htmlFor="cpf">CPF do Cliente:</label>
        <input
          type="text"
          id="cpf"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          placeholder="Digite o CPF do cliente"
        />
        <button type="submit" disabled={!cpf}>
          Pesquisar
        </button>
      </form>
      {cliente && (
        <div className="cliente-detalhes">
          <div className="form-container">
            <div className="dados-pessoais">
              <h3>Dados Pessoais</h3>
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                id="nome"
                value={cliente.nome}
                disabled={!isEditable}
                onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
              />
              <label htmlFor="sobrenome">Sobrenome:</label>
              <input
                type="text"
                id="sobrenome"
                value={cliente.sobrenome}
                disabled={!isEditable}
                onChange={(e) => setCliente({ ...cliente, sobrenome: e.target.value })}
              />
              <label htmlFor="dataNascimento">Data de Nascimento:</label>
              <input
                type="date"
                id="dataNascimento"
                value={cliente.dataNascimento}
                disabled={!isEditable}
                onChange={(e) => setCliente({ ...cliente, dataNascimento: e.target.value })}
              />
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={cliente.email}
                disabled={!isEditable}
                onChange={(e) => setCliente({ ...cliente, email: e.target.value })}
              />
              <label htmlFor="telefone">Celular:</label>
              <input
                type="text"
                id="telefone"
                value={cliente.celular}
                disabled={!isEditable}
                onChange={(e) => setCliente({ ...cliente, celular: e.target.value })}
              />
            </div>
            <div className="endereco">
              <h3>Endereço</h3>
              <label htmlFor="cep">CEP:</label>
              <input
                type="text"
                id="cep"
                value={cliente.enderecoCliente.cep}
                disabled={!isEditable}
                onChange={handleCepChange}
              />
              <label htmlFor="logradouro">Logradouro:</label>
              <input
                type="text"
                id="logradouro"
                value={cliente.enderecoCliente.logradouro}
                disabled={!isEditable}
                onChange={(e) => setCliente({ ...cliente, enderecoCliente: { ...cliente.enderecoCliente, logradouro: e.target.value } })}
              />
              <label htmlFor="numero">Número:</label>
              <input
                type="text"
                id="numero"
                value={cliente.enderecoCliente.numero}
                disabled={!isEditable}
                onChange={(e) => setCliente({ ...cliente, enderecoCliente: { ...cliente.enderecoCliente, numero: e.target.value } })}
              />
              <label htmlFor="complemento">Complemento:</label>
              <input
                type="text"
                id="complemento"
                value={cliente.enderecoCliente.complemento}
                disabled={!isEditable}
                onChange={(e) => setCliente({ ...cliente, enderecoCliente: { ...cliente.enderecoCliente, complemento: e.target.value } })}
              />
              <label htmlFor="bairro">Bairro:</label>
              <input
                type="text"
                id="bairro"
                value={cliente.enderecoCliente.bairro}
                disabled={!isEditable}
                onChange={(e) => setCliente({ ...cliente, enderecoCliente: { ...cliente.enderecoCliente, bairro: e.target.value } })}
              />
              <label htmlFor="cidade">Cidade:</label>
              <input
                type="text"
                id="cidade"
                value={cliente.enderecoCliente.cidade}
                disabled={!isEditable}
                onChange={(e) => setCliente({ ...cliente, enderecoCliente: { ...cliente.enderecoCliente, cidade: e.target.value } })}
              />
              <label htmlFor="estado">Estado:</label>
              <input
                type="text"
                id="estado"
                value={cliente.enderecoCliente.estado}
                disabled={!isEditable}
                onChange={(e) => setCliente({ ...cliente, enderecoCliente: { ...cliente.enderecoCliente, estado: e.target.value } })}
              />
              <label htmlFor="pais">País:</label>
              <input
                type="text"
                id="pais"
                value={cliente.enderecoCliente.pais}
                disabled={!isEditable}
                onChange={(e) => setCliente({ ...cliente, enderecoCliente: { ...cliente.enderecoCliente, pais: e.target.value } })}
              />
            </div>
          </div>
          {!isEditable ? (
            <button type="button" onClick={handleEditClick}>
              Editar
            </button>
          ) : (
            <button type="button" onClick={handleSaveClick}>
              Salvar
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default DadosPaciente;