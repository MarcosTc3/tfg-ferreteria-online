// src/App.jsx

import { Routes, Route, useLocation } from 'react-router-dom';

// Importar Guardias de Seguridad
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Componentes de Layout (Parte Pública)
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Chatbot from './components/Chatbot/Chatbot';

// Páginas Públicas
import Inicio from './pages/Inicio';
import Tienda from './pages/Tienda';
import Servicios from './pages/Servicios';
import Contacto from './pages/Contacto';
import QuienesSomos from './pages/QuienesSomos';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad';
import AvisoLegal from './pages/AvisoLegal';
import NotFound from './pages/NotFound'; // <-- Importar página 404

// Páginas de Autenticación
import Registro from './pages/Registro';
import Login from './pages/Login';

// Páginas Protegidas (Cliente)
import Carrito from './pages/Carrito';
import FinalizarCompra from './pages/FinalizarCompra';
import Perfil from './pages/Perfil';
import Pedidos from './pages/Pedidos';
import ClientMessages from './pages/ClientMessages';

// Páginas Protegidas (Admin)
import AdminMessages from './pages/AdminMessages';
import AdminOrders from './pages/AdminOrders';
import AdminProducts from './pages/AdminProducts';

function App() {
  const location = useLocation(); // Obtenemos la ruta actual

  // Detectamos si la ruta empieza por "/admin"
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Solo mostramos el Header de la tienda si NO estamos en el admin */}
      {!isAdminRoute && <Header />}
      
      <main className={isAdminRoute ? 'admin-main' : ''}>
        <Routes>
          {/* --- RUTAS PÚBLICAS --- */}
          <Route path="/" element={<Inicio />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/aviso-legal" element={<AvisoLegal />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />

          {/* --- RUTAS PROTEGIDAS (CLIENTE) --- */}
          <Route 
            path="/carrito" 
            element={
              <ProtectedRoute>
                <Carrito />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/finalizar-compra" 
            element={
              <ProtectedRoute>
                <FinalizarCompra />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/perfil" 
            element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/pedidos" 
            element={
              <ProtectedRoute>
                <Pedidos />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/mis-mensajes" 
            element={
              <ProtectedRoute>
                <ClientMessages />
              </ProtectedRoute>
            } 
          />
          
          {/* --- RUTAS PROTEGIDAS (ADMIN) --- */}
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <AdminMessages />
              </AdminRoute>
            } 
          />
          <Route 
            path="/admin/mensajes" 
            element={
              <AdminRoute>
                <AdminMessages />
              </AdminRoute>
            } 
          />
          <Route 
            path="/admin/pedidos" 
            element={
              <AdminRoute>
                <AdminOrders />
              </AdminRoute>
            } 
          />
          <Route 
            path="/admin/productos" 
            element={
              <AdminRoute>
                <AdminProducts />
              </AdminRoute>
            } 
          />

          {/* --- RUTA 404 (Debe ir al final) --- */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </main>
      
      {/* Solo mostramos Footer y Chatbot si NO estamos en el admin */}
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <Chatbot />}
    </>
  );
}

export default App;