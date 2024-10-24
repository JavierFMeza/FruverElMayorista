import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

function LoginNew() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    // Lógica de creación de cuenta
    console.log('Nombre Completo:', fullName);
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
