// src/App.jsx

import { Routes, Route } from 'react-router-dom';

// Importar Guardias
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Componentes de Layout
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Páginas Públicas
import Inicio from './pages/Inicio';
import Tienda from './pages/Tienda';
import Servicios from './pages/Servicios';
import Contacto from './pages/Contacto';
import QuienesSomos from './pages/QuienesSomos';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad';
import AvisoLegal from './pages/AvisoLegal';

// Páginas de Autenticación
import Registro from './pages/Registro';
import Login from './pages/Login'; // <-- ¡ESTA ERA LA LÍNEA QUE FALTABA!

// Páginas Protegidas (Cliente)
import Carrito from './pages/Carrito';
import FinalizarCompra from './pages/FinalizarCompra';
import Perfil from './pages/Perfil';
import Pedidos from './pages/Pedidos';

// Páginas Protegidas (Admin)
import AdminMessages from './pages/AdminMessages';
import AdminOrders from './pages/AdminOrders';

function App() {
  return (
    <>
      <Header />
      <main>
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
          
          {/* --- RUTAS PROTEGIDAS (ADMIN) --- */}
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

        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;