// src/pages/Perfil.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaPen, FaSave, FaTimes } from 'react-icons/fa'; 
import './AuthForm.css'; 

function Perfil() {
  const { user, token, login } = useAuth();
  
  // Solo usamos estado para lo que se puede editar (nombre)
  const [name, setName] = useState('');
  // Ya no necesitamos estado para email, lo leemos directo de 'user'
  
  const [isEditingName, setIsEditingName] = useState(false);
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
    }
  }, [user]);

  const handleUpdateName = async () => {
    setMsg('');
    setError('');
    try {
      const config = { headers: { 'x-auth-token': token } };
      const body = { name: name };
      const res = await axios.put('http://localhost:5000/api/auth/update', body, config);
      
      login(res.data.token); 
      setMsg('Nombre actualizado correctamente');
      setIsEditingName(false);
    } catch (err) {
      setError(err.response?.data?.msg || 'Error al actualizar el nombre');
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setMsg('');
    setError('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Por favor, rellena todos los campos de contraseña');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Las nuevas contraseñas no coinciden');
      return;
    }

    try {
      const config = { headers: { 'x-auth-token': token } };
      const body = { currentPassword, newPassword };
      const res = await axios.put('http://localhost:5000/api/auth/update', body, config);
      
      login(res.data.token);
      setMsg('Contraseña actualizada correctamente');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.msg || 'Error al actualizar la contraseña');
    }
  };

  const cancelNameEdit = () => {
    setIsEditingName(false);
    setName(user.name || '');
  };

  return (
    <div className="auth-container" style={{ marginTop: '2rem', maxWidth: '600px' }}>
      <h1 className="auth-title">Mi Perfil</h1>
      
      {msg && <div className="success-msg">{msg}</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="auth-form">
        
        {/* 1. EMAIL CORREGIDO: Lee directo de user.email */}
        <div className="form-group">
          <label>Correo electrónico / Email</label>
          <input 
            type="text" 
            value={user?.email || 'Cargando...'} 
            readOnly 
            style={{ 
              backgroundColor: '#e9ecef', 
              color: '#333333', /* Negro oscuro forzado */
              opacity: 1,       /* Evita transparencia en algunos navegadores */
              cursor: 'default', 
              borderColor: '#ced4da', 
              fontWeight: '600'
            }} 
          />
        </div>

        {/* 2. NOMBRE */}
        <div className="form-group">
          <label>Nombre</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              disabled={!isEditingName} 
              style={isEditingName ? { backgroundColor: '#fff', borderColor: '#004a99' } : {}}
            />
            
            {!isEditingName ? (
              <button 
                type="button" 
                onClick={() => setIsEditingName(true)}
                style={{ padding: '0 15px', cursor: 'pointer', backgroundColor: '#eee', border: '1px solid #ccc', borderRadius: '5px' }}
                title="Editar Nombre"
              >
                <FaPen color="#555" />
              </button>
            ) : (
              <>
                <button 
                  type="button" 
                  onClick={handleUpdateName}
                  style={{ padding: '0 15px', cursor: 'pointer', backgroundColor: '#28a745', border: 'none', borderRadius: '5px' }}
                  title="Guardar Nombre"
                >
                  <FaSave color="white" size="1.2rem" />
                </button>
                <button 
                  type="button" 
                  onClick={cancelNameEdit} 
                  style={{ padding: '0 15px', cursor: 'pointer', backgroundColor: '#dc3545', border: 'none', borderRadius: '5px' }}
                  title="Cancelar"
                >
                  <FaTimes color="white" size="1.2rem" />
                </button>
              </>
            )}
          </div>
        </div>
        
        <hr style={{ margin: '2rem 0', border: '0', borderTop: '1px solid #eee' }} />
        
        {/* 3. CONTRASEÑA */}
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#333' }}>Cambiar Contraseña</h3>
        
        <div className="form-group">
          <label>Contraseña Actual</label>
          <input 
            type="password" 
            value={currentPassword} 
            onChange={(e) => setCurrentPassword(e.target.value)} 
            placeholder="Introduce tu contraseña actual"
          />
        </div>

        <div className="form-group">
          <label>Nueva Contraseña</label>
          <input 
            type="password" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            placeholder="Mínimo 6 caracteres"
          />
        </div>
        <div className="form-group">
          <label>Confirmar Nueva Contraseña</label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            placeholder="Repite la nueva contraseña"
          />
        </div>

        <button 
          type="button" 
          onClick={handleUpdatePassword}
          className="auth-submit-btn" 
          style={{ marginTop: '1rem' }}
        >
          Actualizar Contraseña
        </button>

      </div>
    </div>
  );
}

export default Perfil;