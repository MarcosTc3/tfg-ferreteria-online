// src/pages/Registro.jsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthForm.css';

function Registro() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (password !== password2) {
      setErrors([{ msg: 'Las contraseñas no coinciden' }]);
      return;
    }

    try {
      const newUser = { name, email, password };
      await axios.post('http://localhost:5000/api/auth/register', newUser);

      // ¡ALERTA ELIMINADA! La redirección es suficiente
      navigate('/login');

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
      <h1 className="auth-title">Crear Cuenta</h1>

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
        {/* ... (el resto del formulario JSX sigue igual) ... */}
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input type="text" name="name" value={name} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" name="password" value={password} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirmar Contraseña</label>
          <input type="password" name="password2" value={password2} onChange={onChange} required />
        </div>
        <button type="submit" className="auth-submit-btn">Registrarse</button>
      </form>

      <p className="auth-switch-link">
        ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link>
      </p>
    </div>
  );
}

export default Registro;