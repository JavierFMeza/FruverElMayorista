import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toggleDarkMode, toggleTextSize } from '../utils/utils';
import '../styles.css';

function ProductExpired() {
  const [expiredProducts, setExpiredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openTopMenu, setOpenTopMenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    toggleDarkMode(isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    toggleTextSize(isLargeText);
  }, [isLargeText]);

  useEffect(() => {
    const fetchExpiredProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3301/api/productos/expirados', {
          params: { search: searchTerm },
        });
        setExpiredProducts(response.data);
      } catch (error) {
        console.error('Error al obtener productos expirados:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchExpiredProducts();
  }, [searchTerm]);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

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

        {/* Tabla de productos ya expirados */}
        <div className="product-expired-list">
          <h2>Productos Expirados</h2>
          <p>Lista de productos que ya han expirado.</p>

          {/* Barra de búsqueda */}
          <input
            type="text"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {loading ? (
            <p>Cargando...</p>
          ) : expiredProducts.length === 0 ? (
            <div className="no-expired-products-message">No hay productos expirados.</div>
          ) : (
            <table className="product-expired-table">
              <thead>
                <tr>
                  <th>Código Lote</th>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Fecha de Entrada</th>
                  <th>Creado por</th>
                  <th>Días Desde Vencimiento</th>
                </tr>
              </thead>
              <tbody>
                {expiredProducts.map((item) => (
                  <tr key={item.codigoLote}>
                    <td>{item.codigoLote}</td>
                    <td>{item.nombreProducto}</td>
                    <td>${item.precioProducto}</td>
                    <td>{item.cantidadLote}</td>
                    <td>{new Date(item.fechaEntrada).toISOString().split('T')[0]}</td>
                    <td>{item.nombreUsuario}</td>
                    <td>{item.diasDesdeVencimiento}</td>
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

export default ProductExpired;
