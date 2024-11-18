import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate
import LocalStorageService from '../utils/LocalStorageService'; // Importando o LocalStorageService

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return LocalStorageService.getUser(); // Usando o serviço para obter o usuário
  });

  const navigate = useNavigate(); // Inicializando o useNavigate
  let timeoutId; // Variável para armazenar o ID do timeout

  useEffect(() => {
    const handleActivity = () => {
      if (timeoutId) {
        clearTimeout(timeoutId); // Limpa o timeout anterior
      }
      timeoutId = setTimeout(() => {
        LocalStorageService.clearUser(); // Limpa os dados do usuário
        setUser(null); // Atualiza o estado do usuário
        navigate('/'); // Redireciona para a página de login
      }, 10 * 60 * 1000); // 10 minutos em milissegundos
    };

    // Adiciona os ouvintes de eventos para detectar atividade do usuário
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('scroll', handleActivity);

    return () => {
      clearTimeout(timeoutId); // Limpa o timeout ao desmontar o componente
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('scroll', handleActivity);
    };
  }, [navigate]);

  useEffect(() => {
    if (user) {
      LocalStorageService.setUser(user); // Usando o serviço para armazenar o usuário
    } else {
      LocalStorageService.clearUser(); // Limpa o LocalStorage se o usuário for null
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
