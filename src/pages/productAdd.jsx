import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importamos Link para redirección
import { toggleDarkMode, toggleTextSize } from '../utils/utils';
import '../styles.css';

function ProductAdd() {
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
                <li><Link to="/productAdd">Añadir Producto</Link></li>
                <li><Link to="/productMod">Modificar Producto</Link></li>
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

        {/* Aquí agregamos el formulario para añadir productos */}
        <div className="product-add-form">
          <h2>Añadir nuevo producto</h2>
          <p>Crear nuevo producto</p>
          <form>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="productName">Nombre del producto</label>
                <input type="text" id="productName" name="productName" placeholder="Nombre del producto" />
              </div>

              <div className="form-group">
                <label htmlFor="productUnit">Unidad</label>
                <select id="productUnit" name="productUnit">
                  <option value="">Escoja unidad</option>
                  <option value="kilogram">Kilogramo</option>
                  <option value="liter">Litro</option>
                  <option value="unit">Unidad</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="productCode">Código</label>
                <input type="text" id="productCode" name="productCode" placeholder="Código" />
              </div>

              <div className="form-group">
                <label htmlFor="productQuantity">Cantidad</label>
                <input type="number" id="productQuantity" name="productQuantity" placeholder="Cantidad" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="productDescription">Descripción</label>
              <textarea id="productDescription" name="productDescription" placeholder="Descripción"></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="productDiscount">Descuento</label>
                <select id="productDiscountType" name="productDiscountType">
                  <option value="percentage">Porcentaje</option>
                  <option value="fixed">Fijo</option>
                </select>
                <input type="text" id="productDiscount" name="productDiscount" placeholder="Porcentaje" />
              </div>

              <div className="form-group">
                <label htmlFor="productPrice">Precio</label>
                <input type="text" id="productPrice" name="productPrice" placeholder="Precio" />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-confirm">Confirmar</button>
              <button type="button" className="btn-cancel">Cancelar</button>
            </div>
          </form>
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

export default ProductAdd;
    