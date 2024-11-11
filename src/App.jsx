import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importa Router, Route y Routes
import Home from './pages/home'; // Importa el componente Home
import Login from './pages/login'; // Importa los demás componentes
import LoginNew from './pages/loginNew';
import Notification from './pages/notification';
import ProductAdd from './pages/productAdd';
import ProductExpired from './pages/productExpired';
import ProductExpire from './pages/productExpire';
import ProductFinish from './pages/productFinish';
import ProductList from './pages/productList';
import ProductMod from './pages/productMod';
import Rights from './pages/rights';
import UserProfile from './pages/userProfile';
import LoteAdd from './pages/loteAdd';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginNew" element={<LoginNew />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/productAdd" element={<ProductAdd />} />
        <Route path="/productExpired" element={<ProductExpired />} />
        <Route path="/productExpire" element={<ProductExpire />} />
        <Route path="/productFinish" element={<ProductFinish />} />
        <Route path="/productList" element={<ProductList />} />
        <Route path="/productMod" element={<ProductMod />} />
        <Route path="/rights" element={<Rights />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/loteAdd" element={<LoteAdd />} />
      </Routes>
    </Router>
  );
}

export default App;