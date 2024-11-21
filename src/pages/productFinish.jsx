import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toggleDarkMode, toggleTextSize } from '../utils/utils';
import '../styles.css';

function ProductFinish() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openTopMenu, setOpenTopMenu] = useState(null);
  const [finishingProducts, setFinishingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
const rowsPerPage = 15; // Número de filas por página

const filteredFinishingProducts = finishingProducts.filter((item) =>
  item.nombreProducto.toLowerCase().includes(searchTerm.toLowerCase())
);

const totalPages = Math.ceil(filteredFinishingProducts.length / rowsPerPage); // Total de páginas

  useEffect(() => {
    toggleDarkMode(isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    toggleTextSize(isLargeText);
  }, [isLargeText]);

  useEffect(() => {
    const fetchFinishingProducts = async () => {
      setLoading(true); // Muestra el indicador de carga mientras se obtienen los datos.
      try {
        const response = await axios.get('http://localhost:3301/api/productos/por_acabarse', {
          params: { search: searchTerm },
        });
        setFinishingProducts(response.data);
      } catch (error) {
        console.error('Error al obtener productos por acabarse:', error);
      } finally {
        setLoading(false); // Oculta el indicador de carga cuando los datos se han cargado.
      }
    };
    fetchFinishingProducts();
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

        {/* Tabla de productos por acabarse */}
        <div className="product-finish-list">
          <h2>Productos por Acabarse</h2>
          <p>Lista de productos con bajo inventario.</p>

          {/* Barra de búsqueda */}
          <input
            type="text"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {loading ? (
            <p>Cargando...</p>
          ) : filteredFinishingProducts.length === 0 ? (
            <div className="no-expiring-products-message">No hay productos próximos a acabarse.</div>
          ) : (
            <>
              <table className="product-finish-table">
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
                  {/* Mostrar filas paginadas */}
                  {filteredFinishingProducts
                    .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
                    .map((item) => (
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

export default ProductFinish;