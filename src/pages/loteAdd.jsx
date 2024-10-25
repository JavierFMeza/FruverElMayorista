import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toggleDarkMode, toggleTextSize } from '../utils/utils';
import '../styles.css';

function LoteAdd() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openTopMenu, setOpenTopMenu] = useState(null);

  // Estados para el formulario de Lote
  const [fechaEntrada, setFechaEntrada] = useState('');
  const [idUsuario, setIdUsuario] = useState('');
  const [idProductos, setIdProductos] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);

  // Obtener usuarios y productos desde el backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuariosResponse = await axios.get('http://localhost:3301/api/usuarios');
        const productosResponse = await axios.get('http://localhost:3301/api/productos');
        setUsuarios(usuariosResponse.data);
        setProductos(productosResponse.data);
      } catch (error) {
        console.error('Error al obtener usuarios o productos:', error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3301/api/lotes', {
        fechaEntrada,
        idUsuario,
        idProductos,
        cantidad,
      });
      console.log('Lote añadido:', response.data);
      alert('Lote añadido exitosamente.');
    } catch (error) {
      console.error('Error al añadir lote:', error);
      alert('Error al añadir el lote.');
    }
  };

  // Funciones para alternar el modo oscuro y el tamaño de texto
  useEffect(() => {
    toggleDarkMode(isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
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

      <div className="main-content">
        <div className="top-navbar">
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

        <div className="lote-add-form">
          <h2>Añadir nuevo lote</h2>
          <p>Crear nuevo lote</p>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fechaEntrada">Fecha de Entrada</label>
                <input 
                  type="date" 
                  id="fechaEntrada" 
                  value={fechaEntrada}
                  onChange={(e) => setFechaEntrada(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="idUsuario">Usuario</label>
                <select 
                  id="idUsuario" 
                  value={idUsuario}
                  onChange={(e) => setIdUsuario(e.target.value)} 
                  required
                >
                  <option value="">Selecciona un usuario</option>
                  {usuarios.map(usuario => (
                    <option key={usuario.id} value={usuario.id}>
                      {usuario.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="idProductos">Producto</label>
                <select 
                  id="idProductos" 
                  value={idProductos}
                  onChange={(e) => setIdProductos(e.target.value)} 
                  required
                >
                  <option value="">Selecciona un producto</option>
                  {productos.map(producto => (
                    <option key={producto.id} value={producto.id}>
                      {producto.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="cantidad">Cantidad</label>
                <input 
                  type="number" 
                  id="cantidad" 
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)} 
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

export default LoteAdd;
