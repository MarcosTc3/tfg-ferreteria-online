// src/pages/Registro.jsx

import { useState } from 'react'; // <-- ¡AQUÍ ESTÁ LA CORRECCIÓN! (quitada la 'F' mayúscula)
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthForm.css'; // Importamos el CSS que acabamos de crear

function Registro() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '', // Para confirmar la contraseña
  });
  
  // Estado para guardar los errores que vienen del backend
  const [errors, setErrors] = useState([]);
  
  const navigate = useNavigate(); // Hook para redirigir al usuario

  const { name, email, password, password2 } = formData;

  // Esta función se activa cada vez que escribes en un input
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Esta función se activa al enviar el formulario
  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors([]); // Limpiamos errores antiguos

    // 1. Verificación en el Frontend: ¿las contraseñas coinciden?
    if (password !== password2) {
      setErrors([{ msg: 'Las contraseñas no coinciden' }]);
      return;
    }

    try {
      // 2. Creamos el cuerpo de la petición
      const newUser = {
        name,
        email,
        password,
      };

      // 3. Llamamos a nuestro backend (el que creamos en el Paso 90)
      const res = await axios.post('http://localhost:5000/api/auth/register', newUser);

      // 4. Si tiene éxito:
      // El backend nos devuelve un "token". Por ahora solo mostramos un alert
      // y redirigimos al login.
      alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
      navigate('/login'); // Redirigimos al usuario a la página de login

    } catch (err) {
      // 5. Si el backend devuelve un error:
      if (err.response && err.response.data.errors) {
        // Errores de validación (contraseña débil, etc.)
        setErrors(err.response.data.errors);
      } else if (err.response && err.response.data.msg) {
        // Otro tipo de error (ej: "El email ya está registrado")
        setErrors([{ msg: err.response.data.msg }]);
      } else {
        // Error genérico
        setErrors([{ msg: 'Error en el servidor. Inténtalo más tarde.' }]);
      }
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Crear Cuenta</h1>
      
      {/* Aquí mostramos los mensajes de error */}
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
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirmar Contraseña</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="auth-submit-btn">
          Registrarse
        </button>
      </form>

      <p className="auth-switch-link">
        ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link>
      </p>
    </div>
  );
}

export default Registro;