// src/pages/Inicio.jsx

import Hero from '../components/Hero/Hero';
import Features from '../components/Features/Features';
import KeyServices from '../components/KeyServices/KeyServices';
import FeaturedProducts from '../components/FeaturedProducts/FeaturedProducts';
import Brands from '../components/Brands/Brands';

function Inicio() {
  return (
    <>
      <Hero />
      <Features />
      <FeaturedProducts />
      
      {/* Sección de Especialidades */}
      <KeyServices />
      
      {/* ELIMINADO EL PROMOBANNER DE AQUÍ */}
      
      <Brands />
    </>
  );
}

export default Inicio;