// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Inicio from './pages/Inicio';
import Tienda from './pages/Tienda';
import Servicios from './pages/Servicios';
import Contacto from './pages/Contacto';

// Importamos las nuevas páginas
import QuienesSomos from './pages/QuienesSomos';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad';
import AvisoLegal from './pages/AvisoLegal';

function App() {
  return (
    <>
      <Header />
      <main>
        {/* El div con la clase container ya no es necesario aquí, 
            cada página lo gestionará por su cuenta para mayor flexibilidad */}
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/contacto" element={<Contacto />} />
          
          {/* Añadimos las nuevas rutas */}
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/aviso-legal" element={<AvisoLegal />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App;