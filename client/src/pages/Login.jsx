// src/pages/Login.jsx

import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './AuthForm.css';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); // Para leer de dónde venía
  const { login } = useAuth();

  // Recuperamos la ruta previa o por defecto vamos a la tienda
  const from = location.state?.from?.pathname || '/tienda';

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      const user = { email, password };
      const res = await axios.post('http://localhost:5000/api/auth/login', user);

      const token = res.data.token;
      
      login(token); 

      const payload = JSON.parse(atob(token.split('.')[1]));
      const userRole = payload.user.role;

      if (userRole === 'admin') {
        navigate('/admin');
      } else {
        // Redirigir a donde estaba el usuario
        navigate(from, { replace: true });
      }

    } catch (err) {
      if (err.response && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else if (err.response && err.response.data.msg) {
        setErrors([{ msg: err.response.data.msg }]);
      } else {
        setErrors([{ msg: 'Error en el servidor. Inténtalo más tarde.' }]);
      }
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Iniciar Sesión</h1>
      
      {errors.length > 0 && (
        <div className="error-message">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error.msg}</li>
            ))}
          </ul>
        </div>
      )}

      <form className="auth-form" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" name="password" value={password} onChange={onChange} required />
        </div>
        <button type="submit" className="auth-submit-btn">Entrar</button>
      </form>

      <p className="auth-switch-link">
        ¿No tienes una cuenta? <Link to="/registro">Regístrate</Link>
      </p>
    </div>
  );
}

export default Login;