import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateAdmin, authenticateClient, authenticateProfessional } from '../services/admin/adminService';
import ToastrService from '../utils/ToastrService';
import { useUser } from '../context/UserContext';
import LocalStorageService from '../utils/LocalStorageService';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import '../styles/Login.css';

function Login() {
  const [userType, setUserType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  const handleBack = () => {
    setUserType('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      login: email,
      senha: password,
    };

    try {
      let result;
      if (userType === 'admin') {
        result = await authenticateAdmin(loginData);
      } else if (userType === 'client') {
        result = await authenticateClient(loginData);
      } else if (userType === 'professional') {
        result = await authenticateProfessional(loginData);
      }

<<<<<<< HEAD
      ToastrService.success('Login bem-sucedido!');
=======
      ToastrService.showNotification('success', 'Login bem-sucedido!');
>>>>>>> 3266ea51e60edee22d1b157d47c4c994b2b3c35b
      console.log('Login bem-sucedido:', result);

      setUser({
        id: result.id,
        nome: result.nome,
        sobrenome: result.sobrenome,
        email: result.email,
      });

      LocalStorageService.setUser(result);

      if (userType === 'admin') {
        navigate('/admin');
      } else if (userType === 'client') {
        navigate('/client');
      } else if (userType === 'professional') {
        navigate('/professional');
      }
    } catch (err) {
<<<<<<< HEAD
      ToastrService.error('Falha na autenticação. Verifique suas credenciais.');
=======
      ToastrService.showNotification('error', 'Falha na autenticação. Verifique suas credenciais.');
>>>>>>> 3266ea51e60edee22d1b157d47c4c994b2b3c35b
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>TechMed</h1>
      </div>
      <SwitchTransition>
        <CSSTransition
          key={userType ? 'login-form' : 'user-type-selection'}
          timeout={300}
          classNames="slide"  // Certifique-se de que esta classe esteja definida como "slide"
        >
          {userType ? (
            <div className="login-form">
              <h2>Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit">Login</button>
                <button type="button" onClick={handleBack}>Voltar</button>
              </form>
            </div>
          ) : (
            <div className="user-type-selection">
              <h2>Selecione o tipo de usuário</h2>
              <button onClick={() => handleUserTypeChange('admin')}>Admin</button>
              <button onClick={() => handleUserTypeChange('client')}>Paciente</button>
              <button onClick={() => handleUserTypeChange('professional')}>Medico</button>
            </div>
          )}
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}

<<<<<<< HEAD
export default Login;
=======
export default Login;
>>>>>>> 3266ea51e60edee22d1b157d47c4c994b2b3c35b
