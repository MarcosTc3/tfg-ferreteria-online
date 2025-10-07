// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Inicio from './pages/Inicio';
import Tienda from './pages/Tienda';
import Servicios from './pages/Servicios';
import Contacto from './pages/Contacto';

function App() {
  return (
    <>
      <Header />
      <main>
        {/* Aplicamos la clase container aquí */}
        <div className="container">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App