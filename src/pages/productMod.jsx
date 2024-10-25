import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importamos Link para redirección
import { toggleDarkMode, toggleTextSize } from '../utils/utils';
import '../styles.css';

function ProductMod() {
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

        {/* Aquí se genera la tabla de modificar productos */}
        <div className="product-list">
          <h2>Lista de productos</h2>
          <p>Modifica tus productos</p>

          <div className="table-controls">
            <div className="search-bar">
              <input type="text" placeholder="Search..." />
            </div>
            <button className="btn-add-new"><Link to="/productAdd">Añadir Producto</Link></button>
          </div>

          <table className="product-table">
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>Nombre</th>
                <th>No</th>
                <th>Precio</th>
                <th>Unidades</th>
                <th>Creado por</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
            <tr>
                <td><input type="checkbox" /></td>
                <td>Manzanas</td>
                <td>PT001</td>
                <td>$900</td>
                <td>100</td>
                <td>Admin</td>
                <td>
                  <button className="action-btn view-btn">👁️</button>
                  <button className="action-btn edit-btn">✏️</button>
                  <button className="action-btn delete-btn">🗑️</button>
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td>Peras</td>
                <td>PT002</td>
                <td>$1200</td>
                <td>150</td>
                <td>Admin</td>
                <td>
                  <button className="action-btn view-btn">👁️</button>
                  <button className="action-btn edit-btn">✏️</button>
                  <button className="action-btn delete-btn">🗑️</button>
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td>Lechuga</td>
                <td>PT003</td>
                <td>$750</td>
                <td>200</td>
                <td>Admin</td>
                <td>
                  <button className="action-btn view-btn">👁️</button>
                  <button className="action-btn edit-btn">✏️</button>
                  <button className="action-btn delete-btn">🗑️</button>
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td>Zanahorias</td>
                <td>PT004</td>
                <td>$650</td>
                <td>300</td>
                <td>Admin</td>
                <td>
                  <button className="action-btn view-btn">👁️</button>
                  <button className="action-btn edit-btn">✏️</button>
                  <button className="action-btn delete-btn">🗑️</button>
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td>Tomates</td>
                <td>PT005</td>
                <td>$800</td>
                <td>250</td>
                <td>Admin</td>
                <td>
                  <button className="action-btn view-btn">👁️</button>
                  <button className="action-btn edit-btn">✏️</button>
                  <button className="action-btn delete-btn">🗑️</button>
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td>Aguacates</td>
                <td>PT006</td>
                <td>$1700</td>
                <td>40</td>
                <td>Admin</td>
                <td>
                  <button className="action-btn view-btn">👁️</button>
                  <button className="action-btn edit-btn">✏️</button>
                  <button className="action-btn delete-btn">🗑️</button>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="pagination">
            <span>Show per page:</span>
            <select>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>

            <div className="page-info">
              <span>1 - 7 of 7 items</span>
            </div>
          </div>
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

export default ProductMod;
