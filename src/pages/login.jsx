import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Lógica de autenticación
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Logo */}
        <div className="login-logo">
            <img src="https://www.esencialcostarica.com/wp-content/uploads/2023/10/Fruver-logotipo-001-1024x791.jpg" alt="Fruver Logo" />
        </div>

        {/* Título */}
        <h2>Ingresar</h2>
        <p>Porfavor ingresar con su cuenta</p>

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
                placeholder="Igresa tu correo"
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

          {/* Link de "¿Olvidaste tu contraseña?" */}
          <div className="forgot-password">
            <Link to="/forgot-password" className="forgot-link">
              olvidaste tu contraseña?
            </Link>
          </div>

          {/* Botón de login */}
          <div className="form-actions">
            <button type="submit" className="btn-login"><Link to="/">Ingresar</Link></button>
          </div>
        </form>

        {/* Link para registrarse */}
        <div className="signup-link">
          No tienes cuenta? <Link to="/loginNew">Registrate</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
