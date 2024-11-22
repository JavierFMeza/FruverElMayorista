import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { toggleDarkMode, toggleTextSize } from '../utils/utils';
import '../styles.css';

ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);

function Report() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openTopMenu, setOpenTopMenu] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lotUserChartData, setLotUserChartData] = useState(null);
  const [notifications, setNotifications] = useState(null);

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

  useEffect(() => {
    const fetchReportData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3301/api/reportes/productos_mas_movidos');
        const data = response.data;

        // Procesar datos para el gráfico
        const labels = data.map((item) => item.nombreProducto);
        const quantities = data.map((item) => item.totalCantidad);

        setChartData({
          labels,
          datasets: [
            {
              label: 'mayor cantidad total de lotes',
              data: quantities,
              backgroundColor: 'rgba(75, 192, 192, 0.6)', // Color de las barras
              borderColor: 'rgba(75, 192, 192, 1)', // Borde de las barras
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error al obtener datos para el gráfico:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  useEffect(() => {
    const fetchLotUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3301/api/reportes/usuarios_mas_lotes');
        const data = response.data;

        // Procesar datos para el gráfico
        const labels = data.map((item) => item.nombreUsuario);
        const lotCounts = data.map((item) => item.totalLotesIngresados);

        setLotUserChartData({
          labels,
          datasets: [
            {
              label: 'Lotes Ingresados',
              data: lotCounts,
              backgroundColor: 'rgba(153, 102, 255, 0.6)', // Color de las barras
              borderColor: 'rgba(153, 102, 255, 1)', // Borde de las barras
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error al obtener datos para el gráfico de lotes por usuario:', error);
      }
    };

    fetchLotUserData();
  }, []);

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

        {/* Gráfico de barras */}
        <div style={{ width: '50%', margin: 'auto', padding: '20px' }}>
          <h2>Reporte: Productos con la mayor cantidad total de lotes</h2>
          {loading ? (
            <p>Cargando gráfico...</p>
          ) : (
            chartData && (
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: true,
                      position: 'top',
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Cantidad Total',
                      },
                    },
                    x: {
                      title: {
                        display: true,
                        text: 'Productos',
                      },
                    },
                  },
                }}
              />
            )
          )}
        </div>
        {/* Gráfico de usuarios con más lotes */}
        <div style={{ width: '50%', margin: 'auto', padding: '20px' }}>
            <h2>Reporte: Usuarios con Más Lotes Ingresados</h2>
            {lotUserChartData ? (
            <Bar
                data={lotUserChartData}
                options={{
                responsive: true,
                plugins: {
                    legend: {
                    display: true,
                    position: 'top',
                    },
                },
                scales: {
                    y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Cantidad de Lotes',
                    },
                    },
                    x: {
                    title: {
                        display: true,
                        text: 'Usuarios',
                    },
                    },
                },
                }}
            />
            ) : (
            <p>Cargando gráfico de lotes...</p>
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

export default Report;
