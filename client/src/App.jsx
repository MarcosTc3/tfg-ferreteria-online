// src/App.jsx

import { Routes, Route } from 'react-router-dom';

// 1. Importar el guardián
import ProtectedRoute from './components/ProtectedRoute';

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
import Registro from './pages/Registro';
import Login from './pages/Login';

// Páginas Protegidas
import Carrito from './pages/Carrito';
import FinalizarCompra from './pages/FinalizarCompra';
import Perfil from './pages/Perfil';
import Pedidos from './pages/Pedidos';

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

          {/* --- RUTAS PROTEGIDAS --- */}
          {/* 2. Envolvemos la página con el componente ProtectedRoute */}
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
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;