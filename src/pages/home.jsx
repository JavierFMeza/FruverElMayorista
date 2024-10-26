import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importamos Link para redirección
import { toggleDarkMode, toggleTextSize } from '../utils/utils';
import '../styles.css';

function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // Controla cuál menú desplegable está abierto en la sidebar
  const [openTopMenu, setOpenTopMenu] = useState(null); // Controla cuál menú desplegable está abierto en la top navbar

  // Efecto para manejar el modo oscuro en el body
  React.useEffect(() => {
    toggleDarkMode(isDarkMode);
  }, [isDarkMode]);

  // Efecto para manejar el tamaño del texto en el body
  React.useEffect(() => {
    toggleTextSize(isLargeText);
  }, [isLargeText]);

  // Función para alternar la visibilidad del menú desplegable en la sidebar
  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu); // Cierra el menú abierto o abre el nuevo
  };

  // Función para alternar la visibilidad del menú desplegable en la top navbar
  const toggleTopMenu = (menu) => {
    setOpenTopMenu(openTopMenu === menu ? null : menu); // Cierra el menú abierto o abre el nuevo en la top navbar
  };

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
              <li><Link to="/productList">Lista de productos</Link></li>
              <li><Link to="/productMod">Modificar Producto</Link></li>
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
                <li><Link to="/productExpire">Productos por vencer</Link></li>
                <li><Link to="/productFinish">Productos por acabarse</Link></li>
                <li><Link to="/productBest">Productos más vendidos</Link></li>
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
                    <li><Link to="/notification">Ver Notificaciones</Link></li>
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
                    <li><Link to="/userProfile">Perfil</Link></li>
                    <li><Link to="/login">Cerrar sesión</Link></li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Aquí el contenido de productos y tablas */}
        <div className="header">
          <h2>Productos recientemente añadidos</h2>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Productos</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Manzanas rojas</td>
                <td>$1,000</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Cerezas</td>
                <td>$1,500</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Bananas</td>
                <td>$800</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Cebolla larga</td>
                <td>$700</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="expired-products">
          <h2>Productos expirados</h2>
          <table>
            <thead>
              <tr>
                <th>SNo</th>
                <th>Código del producto</th>
                <th>Nombre del producto</th>
                <th>Fecha de vencimiento</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>IT0001</td>
                <td>Naranja</td>
                <td>1-10-2024</td>
              </tr>
              <tr>
                <td>2</td>
                <td>IT0002</td>
                <td>Piña</td>
                <td>5-10-2024</td>
              </tr>
              <tr>
                <td>3</td>
                <td>IT0003</td>
                <td>Strawberry</td>
                <td>2-10-2024</td>
              </tr>
              <tr>
                <td>4</td>
                <td>IT0004</td>
                <td>Avocado</td>
                <td>6-10-2024</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <p>&copy; 2024 Fruver. Todos los derechos reservados.</p>
        <ul>
          <li><Link to="/rights">Política de privacidad</Link></li>
          <li><a href="#">Términos de servicio</a></li>
          <li><a href="https://w.app/MWKxIe" target="_blank" rel="link de contacto">Contacto</a></li>
        </ul>
      </footer>
    </div>
  );
}

export default Home;
