// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Inicio from './pages/Inicio';
import Tienda from './pages/Tienda';
import Contacto from './pages/Contacto';
import QuienesSomos from './pages/QuienesSomos';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad';
import AvisoLegal from './pages/AvisoLegal';
import Servicios from './pages/Servicios';

// 1. Importa la nueva página de Carrito
import Carrito from './pages/Carrito';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/aviso-legal" element={<AvisoLegal />} />

          {/* 2. Añade la ruta para Carrito */}
          <Route path="/carrito" element={<Carrito />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App;