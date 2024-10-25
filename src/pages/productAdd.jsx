import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toggleDarkMode, toggleTextSize } from '../utils/utils';
import '../styles.css';

function ProductAdd() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); 
  const [openTopMenu, setOpenTopMenu] = useState(null);

  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [diasParaVencimiento, setDiasParaVencimiento] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3301/api/products', {
        nombre,
        precio,
        diasParaVencimiento,
      });
      console.log('Producto añadido:', response.data);
      alert('Producto añadido exitosamente.');
    } catch (error) {
      console.error('Error al añadir producto:', error);
      alert('Error al añadir el producto.');
    }
  };

  // Funciones para alternar el modo oscuro y el tamaño de texto
  React.useEffect(() => {
    toggleDarkMode(isDarkMode);
  }, [isDarkMode]);

  React.useEffect(() => {
    toggleTextSize(isLargeText);
  }, [isLargeText]);

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
              <li><Link to="/productList">Lista de productos</Link></li>
              <li><Link to="/productMod">Modificar Producto</Link></li>
              <li><Link to="/loteAdd">añadir Lote de producto</Link></li>
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
          {/* Accessibility Icon */}
          <div className="nav-icons">
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

            {/* Notification Icon */}
            </div>
            <div className="nav-item" id="notification">
              <i className="icon" onClick={() => toggleTopMenu('notification')}>&#128276;</i>
              {openTopMenu === 'notification' && (
                <div className="submenu show">
                  <ul>
                    <li><Link to="/notification">Ver Notificaciones</Link></li>
                  </ul>
                </div>
              )}
            {/* User Icon */}
            </div>
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

        <div className="product-add-form">
          <h2>Añadir nuevo producto</h2>
          <p>Crear nuevo producto</p>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="productName">Nombre del producto</label>
                <input 
                  type="text" 
                  id="productName" 
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)} 
                  placeholder="Nombre del producto" 
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="productPrice">Precio</label>
                <input 
                  type="number" 
                  id="productPrice" 
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)} 
                  placeholder="Precio" 
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="productExpiry">Días para vencimiento</label>
                <input 
                  type="number" 
                  id="productExpiry" 
                  value={diasParaVencimiento}
                  onChange={(e) => setDiasParaVencimiento(e.target.value)} 
                  placeholder="Días para vencimiento" 
                  required 
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-confirm">Confirmar</button>
              <button type="button" className="btn-cancel">Cancelar</button>
            </div>
          </form>
        </div>
      </div>

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

export default ProductAdd;
