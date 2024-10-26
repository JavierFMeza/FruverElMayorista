import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toggleDarkMode, toggleTextSize } from '../utils/utils';
import '../styles.css';

function ProductList() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openTopMenu, setOpenTopMenu] = useState(null);
  const [inventory, setInventory] = useState([]); // Estado para almacenar el inventario
  const [loading, setLoading] = useState(true); // Estado para el loading

  // Efecto para manejar el modo oscuro
  useEffect(() => {
    toggleDarkMode(isDarkMode);
  }, [isDarkMode]);

  // Efecto para manejar el tamaño del texto
  useEffect(() => {
    toggleTextSize(isLargeText);
  }, [isLargeText]);

  // Efecto para obtener los datos del inventario desde el backend
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get('http://localhost:3301/api/inventario'); // Ajusta esta URL a tu backend
        setInventory(response.data); // Establecer inventario desde la respuesta
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener inventario:', error);
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  // Función para alternar el menú desplegable en la sidebar
  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  // Función para alternar el menú desplegable en la top navbar
  const toggleTopMenu = (menu) => {
    setOpenTopMenu(openTopMenu === menu ? null : menu);
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

        {/* Tabla de inventario */}
        <div className="product-list">
          <h2>Lista de inventario</h2>
          <p>Gestiona tus productos</p>

          {loading ? (
            <p>Cargando inventario...</p>
          ) : (
            <table className="product-table">
              <thead>
                <tr>
                  <th>Código Lote</th>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Fecha de Entrada</th>
                  <th>Creado por</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.codigoLote}>
                    <td>{item.codigoLote}</td>
                    <td>{item.nombreProducto}</td>
                    <td>${item.precioProducto}</td>
                    <td>{item.cantidadLote}</td>
                    <td>{new Date(item.fechaEntrada).toISOString().split('T')[0]}</td> {/* Formato YYYY-MM-DD */}
                    <td>{item.nombreUsuario}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
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

export default ProductList;
