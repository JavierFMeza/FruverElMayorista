import React, { useState } from 'react';
import axios from 'axios'; // Importa Axios para hacer solicitudes HTTP
import { Link } from 'react-router-dom';
import '../styles.css';

function LoginNew() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3302/api/register', {
        nombre: fullName,
        correo: email,
        contraseña: password,
      });

      if (response.data.success) {
        alert('Registro exitoso, ahora puedes iniciar sesión.');
        // Aquí podrías redirigir al usuario a la página de login, por ejemplo:
        // history.push('/login');
      } else {
        alert('Hubo un error en el registro: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Hubo un error al registrar el usuario. Intenta nuevamente.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Logo */}
        <div className="login-logo">
          <img src="https://www.esencialcostarica.com/wp-content/uploads/2023/10/Fruver-logotipo-001-1024x791.jpg" alt="Fruver Logo" />
        </div>

        {/* Título */}
        <h2>Crear cuenta</h2>
        <p>Continuar donde lo dejaste</p>

        {/* Formulario */}
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="fullName">Nombre completo</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ingresa tu nombre completo"
                required
              />
              <span className="input-icon">👤</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo"
                required
              />
              <span className="input-icon">✉️</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                required
              />
              <span
                className="input-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>
          </div>

          {/* Botón de registro */}
          <div className="form-actions">
            <button type="submit" className="btn-login">Crear cuenta</button>
          </div>
        </form>

        {/* Link para iniciar sesión */}
        <div className="signup-link">
          Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginNew;
