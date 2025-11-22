// src/pages/Servicios.jsx

import { FaTools, FaKey, FaPaintRoller, FaBolt, FaHardHat, FaTruck } from 'react-icons/fa';
import './InfoPages.css';

function Servicios() {
  const services = [
    {
      icon: <FaKey />,
      title: "Copia de Llaves",
      desc: "Duplicado de todo tipo de llaves al instante: serreta, seguridad, gorja y mandos de garaje."
    },
    {
      icon: <FaPaintRoller />,
      title: "Pinturas a la Carta",
      desc: "Sistema tintométrico para crear el color exacto que necesitas al momento para tus paredes."
    },
    {
      icon: <FaTools />,
      title: "Alquiler de Herramientas",
      desc: "¿Necesitas un taladro o una lijadora solo por un día? Alquila maquinaria profesional."
    },
    {
      icon: <FaBolt />,
      title: "Material Eléctrico",
      desc: "Asesoramiento en iluminación LED, cableado y pequeña instalación doméstica."
    },
    {
      icon: <FaHardHat />,
      title: "Vestuario Laboral",
      desc: "Equipamiento de protección individual (EPIS), calzado de seguridad y ropa de trabajo."
    },
    {
      icon: <FaTruck />,
      title: "Reparto a Domicilio",
      desc: "Servicio de entrega gratuito para pedidos voluminosos en Fuenlabrada y alrededores."
    }
  ];

  return (
    <div className="info-page-container">
      <div className="info-header">
        <h1>Nuestros Servicios</h1>
        <p>No solo vendemos herramientas, ofrecemos soluciones integrales para tus proyectos de bricolaje y construcción.</p>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Servicios;