// src/App.jsx

import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Inicio from './pages/Inicio';
import Tienda from './pages/Tienda';
import Servicios from './pages/Servicios';
import Contacto from './pages/Contacto';
import QuienesSomos from './pages/QuienesSomos';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad';
import AvisoLegal from './pages/AvisoLegal';
import Carrito from './pages/Carrito';
import FinalizarCompra from './pages/FinalizarCompra';

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
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/finalizar-compra" element={<FinalizarCompra />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;