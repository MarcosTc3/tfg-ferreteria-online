// src/App.jsx

import { Routes, Route, useLocation } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Inicio from './pages/Inicio';
import Tienda from './pages/Tienda';
import Servicios from './pages/Servicios';
import Contacto from './pages/Contacto';
import QuienesSomos from './pages/QuienesSomos';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad';
import AvisoLegal from './pages/AvisoLegal';
import Registro from './pages/Registro';
import Login from './pages/Login';

import Carrito from './pages/Carrito';
import FinalizarCompra from './pages/FinalizarCompra';
import Perfil from './pages/Perfil';
import Pedidos from './pages/Pedidos';

import AdminMessages from './pages/AdminMessages';
import AdminOrders from './pages/AdminOrders';
import AdminProducts from './pages/AdminProducts'; // <-- 1. IMPORTAR

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Header />}
      
      <main className={isAdminRoute ? 'admin-main' : ''}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/aviso-legal" element={<AvisoLegal />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />

          <Route path="/carrito" element={<ProtectedRoute><Carrito /></ProtectedRoute>} />
          <Route path="/finalizar-compra" element={<ProtectedRoute><FinalizarCompra /></ProtectedRoute>} />
          <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
          <Route path="/pedidos" element={<ProtectedRoute><Pedidos /></ProtectedRoute>} />
          
          {/* RUTAS ADMIN */}
          <Route path="/admin" element={<AdminRoute><AdminMessages /></AdminRoute>} />
          <Route path="/admin/mensajes" element={<AdminRoute><AdminMessages /></AdminRoute>} />
          <Route path="/admin/pedidos" element={<AdminRoute><AdminOrders /></AdminRoute>} />
          {/* 2. NUEVA RUTA DE PRODUCTOS */}
          <Route path="/admin/productos" element={<AdminRoute><AdminProducts /></AdminRoute>} />

        </Routes>
      </main>
      
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;