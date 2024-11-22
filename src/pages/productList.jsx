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
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15; // Número de filas por página
  const [notifications, setNotifications] = useState(null);

  const totalPages = Math.ceil(inventory.length / rowsPerPage); // Total de páginas

  // Aplicar búsqueda
  const filteredInventory = inventory.filter((item) =>
    item.nombreProducto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    toggleDarkMode(isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    toggleTextSize(isLargeText);
  }, [isLargeText]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get('http://localhost:3301/api/inventario');
        setInventory(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener inventario:', error);
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(`http://localhost:3301/api/inventario`, {
          params: { search: searchTerm },
        });
        setInventory(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener inventario:', error);
        setLoading(false);
      }
    };
    fetchInventory();
  }, [searchTerm]); // Ejecuta fetchInventory cuando searchTerm cambie

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
          <h1><Link to="/home">FRUVER</Link></h1>
        </div>
        <ul className="menu">
          <li>
            <Link to="/home" className="menu-item">Página principal</Link>
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
                    <li><Link to="/">Cerrar sesión</Link></li>
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

          {/* Barra de búsqueda */}
          <input
            type="text"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {loading ? (
            <p>Cargando inventario...</p>
          ) : (
            <>
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
                  {/* Marca esta parte para cambiar la cantidad de filas por página */}
                  {filteredInventory.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage).map((item) => (
                    <tr key={item.codigoLote}>
                      <td>{item.codigoLote}</td>
                      <td>{item.nombreProducto}</td>
                      <td>${item.precioProducto}</td>
                      <td>{item.cantidadLote}</td>
                      <td>{new Date(item.fechaEntrada).toISOString().split('T')[0]}</td>
                      <td>{item.nombreUsuario}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Paginación */}
              <div className="pagination">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Anterior
                </button>
                <select
                  value={currentPage}
                  onChange={(e) => setCurrentPage(Number(e.target.value))}
                >
                  {Array.from({ length: totalPages }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Página {i + 1}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </button>
              </div>
            </>
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
