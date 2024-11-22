import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toggleDarkMode, toggleTextSize } from '../utils/utils';
import '../styles.css';

function Rights() {
  // Declaración de estados dentro del componente
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openTopMenu, setOpenTopMenu] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [loading, setLoading] = useState(true);

  // Efectos para manejar modo oscuro y tamaño de texto
  useEffect(() => {
    toggleDarkMode(isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    toggleTextSize(isLargeText);
  }, [isLargeText]);

  // Función para manejar dropdowns
  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const toggleTopMenu = (menu) => {
    setOpenTopMenu(openTopMenu === menu ? null : menu);
  };

  // Efecto para cargar notificaciones
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:3301/api/notificaciones');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error al cargar notificaciones:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="app">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <h1><Link to="/">FRUVER</Link></h1>
        </div>
        <ul className="menu">
          <li>
            <Link to="/" className="menu-item">Página principal</Link>
          </li>
          <li>
            <a href="#" className="menu-item" onClick={() => toggleDropdown('inventario')}>
              <span>📦</span> Inventario <span className={`arrow ${openDropdown === 'inventario' ? 'submenu-active' : ''}`}>&#9662;</span>
            </a>
            {openDropdown === 'inventario' && (
              <ul className="dropdown-list">
                <li><Link to="/productList">Lista de Lotes de productos</Link></li>
                <li><Link to="/productMod">Modificar Lotes de productos</Link></li>
                <li><Link to="/loteAdd">Añadir Lote de producto</Link></li>
                <li><Link to="/productAdd">Añadir Producto</Link></li>
              </ul>
            )}
          </li>
          <li>
            <a href="#" className="menu-item" onClick={() => toggleDropdown('reportes')}>
              <span>🛒</span> Reportes <span className={`arrow ${openDropdown === 'reportes' ? 'submenu-active' : ''}`}>&#9662;</span>
            </a>
            {openDropdown === 'reportes' && (
              <ul className="dropdown-list">
                <li><Link to="/productExpire">Lotes de productos por vencer</Link></li>
                <li><Link to="/productFinish">Lotes de productos por acabarse</Link></li>
                <li><Link to="/productExpired">Lotes de productos ya expirados</Link></li>
                <li><Link to="/reports">Reporte de consolidados</Link></li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navbar */}
        <div className="top-navbar">
          <div className="nav-icons">
            {/* Accessibility Icon */}
            <div className="nav-item" id="accessibility">
              <i className="icon" onClick={() => toggleTopMenu('accessibility')}>&#9881;</i>
              {openTopMenu === 'accessibility' && (
                <div className="submenu show">
                  <ul>
                    <li><a href="#" onClick={() => setIsDarkMode(!isDarkMode)}>Modo Oscuro</a></li>
                    <li><a href="#" onClick={() => setIsLargeText(!isLargeText)}>Tamaño de texto</a></li>
                  </ul>
                </div>
              )}
            </div>

            {/* Notification Icon */}
            <div className="nav-item" id="notification">
              <i className="icon" onClick={() => toggleTopMenu('notification')}>&#128276;</i>
              {openTopMenu === 'notification' && (
                <div className="submenu show">
                  <ul>
                    {loading ? (
                      <li>Cargando notificaciones...</li>
                    ) : Object.keys(notifications || {}).length === 0 ? (
                      <li>No hay notificaciones</li>
                    ) : (
                      <>
                        {notifications.masCercano && (
                          <li>
                            Producto más cercano a vencerse:{' '}
                            <Link to="/productExpire">
                              {notifications.masCercano.producto} (
                              {notifications.masCercano.diasRestantes} días restantes)
                            </Link>
                          </li>
                        )}
                        {notifications.expiraHoy && (
                          <li>
                            Producto que expira hoy:{' '}
                            <Link to="/productExpired">{notifications.expiraHoy.producto}</Link>
                          </li>
                        )}
                        {notifications.lotesHoy && (
                          <li>
                            Lotes añadidos hoy:{' '}
                            <Link to="/productList">{notifications.lotesHoy.lotesHoy} lotes</Link>
                          </li>
                        )}
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* User Icon */}
            <div className="nav-item" id="user">
              <i className="icon" onClick={() => toggleTopMenu('user')}>&#128100;</i>
              {openTopMenu === 'user' && (
                <div className="submenu show">
                  <ul>
                    <li><Link to="/login">Cerrar sesión</Link></li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="text-content">
          <h1>Política de Privacidad</h1>
          <p>
            Nuestra política de privacidad establece cómo se recopila, usa y protege la
            información que compartes con nosotros.
          </p>

          <h2>Términos de Servicio</h2>
          <p>
            Al usar nuestros servicios, aceptas los términos y condiciones especificados en
            este documento.
          </p>

          <h2>Contacto</h2>
          <p>
            Si tienes alguna duda, por favor contáctanos en{' '}
            <a href="mailto:contacto@fruver.com">contacto@fruver.com</a>.
          </p>
      </div>
      

      {/* Footer */}
      <footer>
        <p>&copy; 2024 Fruver. Todos los derechos reservados.</p>
        <ul>
          <li><Link to="/rights">Política de privacidad</Link></li>
          <li><a href="#">Términos de servicio</a></li>
          <li><a href="#">Contacto</a></li>
        </ul>
      </footer>
    </div>
  );
}

export default Rights;