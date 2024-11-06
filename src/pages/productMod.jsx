import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toggleDarkMode, toggleTextSize } from '../utils/utils';
import '../styles.css';

function ProductMod() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // Controla cuál menú desplegable está abierto en la sidebar
  const [openTopMenu, setOpenTopMenu] = useState(null); // Controla cuál menú desplegable está abierto en la top navbar
  const [inventory, setInventory] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editProduct, setEditProduct] = useState(null);

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

  // Cargar inventario y productos al iniciar
  const fetchInventory = async () => {
    try {
      const response = await axios.get('http://localhost:3301/api/inventario');
      setInventory(response.data);
    } catch (error) {
      alert('Error al obtener el inventario.');
      console.error('Error al obtener inventario:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3301/api/productos');
      setProducts(response.data);
    } catch (error) {
      alert('Error al obtener productos.');
      console.error('Error al obtener productos:', error);
    }
  };

  useEffect(() => {
    fetchInventory();
    fetchProducts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredInventory = inventory.filter((item) =>
    item.nombreProducto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startEdit = (product) => {
    setEditProduct({ ...product });
  };

  const cancelEdit = () => {
    setEditProduct(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e) => {
    const selectedProductId = e.target.value;
    setEditProduct((prev) => ({ ...prev, idProductos: selectedProductId }));
  };

  const saveEdit = async () => {
    try {
      await axios.put(`http://localhost:3301/api/lotes/${editProduct.codigoLote}`, {
        idProductos: editProduct.idProductos,
        cantidadLote: editProduct.cantidadLote,
      });
      alert('Producto actualizado exitosamente.');
      setEditProduct(null);
      fetchInventory();
    } catch (error) {
      alert('Error al guardar los cambios.');
      console.error('Error al guardar cambios:', error);
    }
  };

  const deleteProduct = async (codigoLote) => {
    try {
      await axios.delete(`http://localhost:3301/api/lotes/${codigoLote}`);
      alert('Producto eliminado exitosamente.');
      fetchInventory();
    } catch (error) {
      alert('Error al eliminar el producto.');
      console.error('Error al eliminar el producto:', error);
    }
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

        {/* Tabla de modificar productos */}
        <div className="product-list">
          <h2>Modificar Productos</h2>
          <p>Busca, modifica o elimina productos</p>

          {/* Barra de búsqueda */}
          <input
            type="text"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={handleSearchChange}
          />

          <table className="product-table">
            <thead>
              <tr>
                <th>Código Lote</th>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Fecha de Entrada</th>
                <th>Creado por</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((product) => (
                <tr key={product.codigoLote}>
                  <td>{product.codigoLote}</td>
                  <td>
                    {editProduct && editProduct.codigoLote === product.codigoLote ? (
                      <select
                        name="idProductos"
                        value={editProduct.idProductos}
                        onChange={handleSelectChange}
                      >
                        {products.map((prod) => (
                          <option key={prod.id} value={prod.id}>
                            {prod.nombre}
                          </option>
                        ))}
                      </select>
                    ) : (
                      product.nombreProducto
                    )}
                  </td>
                  <td>
                    {editProduct && editProduct.codigoLote === product.codigoLote ? (
                      <input
                        name="cantidadLote"
                        value={editProduct.cantidadLote}
                        onChange={handleEditChange}
                      />
                    ) : (
                      product.cantidadLote
                    )}
                  </td>
                  <td>{new Date(product.fechaEntrada).toISOString().split('T')[0]}</td>
                  <td>{product.nombreUsuario}</td>
                  <td>
                    {editProduct && editProduct.codigoLote === product.codigoLote ? (
                      <>
                        <button onClick={saveEdit}>Guardar</button>
                        <button onClick={cancelEdit}>Cancelar</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => startEdit(product)}>✏️</button>
                        <button onClick={() => deleteProduct(product.codigoLote)}>🗑️</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
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
          <li><a href="#">Contacto</a></li>
        </ul>
      </footer>
    </div>
  );
}

export default ProductMod;
