import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importamos axios para conectar con el backend
import '../styles.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Estado para mostrar errores
  const navigate = useNavigate(); // Para redirigir al usuario

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3302/api/login', {
        correo: email,
        contraseña: password,
      });

      if (response.data.success) {
        // Redirigir a la página principal si el login es exitoso
        navigate('/home');
      } else {
        // Mostrar mensaje de error si el login falla
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error al intentar iniciar sesión:', error);
      setErrorMessage('Hubo un error en el servidor.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Logo */}
        <div className="login-logo">
          <img
            src="https://www.esencialcostarica.com/wp-content/uploads/2023/10/Fruver-logotipo-001-1024x791.jpg"
            alt="Fruver Logo"
          />
        </div>

        {/* Título */}
        <h2>Ingresar</h2>
        <p>Por favor ingresar con su cuenta</p>

        {/* Formulario */}
        <form onSubmit={handleLogin}>
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

          {/* Mostrar error en caso de fallo en el login */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {/* Link de "¿Olvidaste tu contraseña?" */}
          <div className="forgot-password">
            <Link to="/forgot-password" className="forgot-link">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {/* Botón de login */}
          <div className="form-actions">
            <button type="submit" className="btn-login">Ingresar</button>
          </div>
        </form>

        {/* Link para registrarse */}
        <div className="signup-link">
          No tienes cuenta? <Link to="/loginNew">Regístrate</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
