// Función para alternar el modo oscuro en el body
export function toggleDarkMode(isDarkMode) {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
  
  // Función para alternar el tamaño del texto en el body
  export function toggleTextSize(isLargeText) {
    if (isLargeText) {
      document.body.classList.add('large-text');
    } else {
      document.body.classList.remove('large-text');
    }
  }
  
  // Función para manejar el submenú de la Sidebar
  export function handleSidebarSubmenuToggle(index, openSidebarSubmenu, setOpenSidebarSubmenu) {
    setOpenSidebarSubmenu(openSidebarSubmenu === index ? null : index);
  }
  
  // Función para manejar el submenú de la Top Navbar
  export function handleTopNavbarSubmenuToggle(index, openTopNavbarSubmenu, setOpenTopNavbarSubmenu){
     setOpenTopNavbarSubmenu(openTopNavbarSubmenu === index ? null : index); 
    }
  