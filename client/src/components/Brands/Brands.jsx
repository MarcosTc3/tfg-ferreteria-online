// src/components/Brands/Brands.jsx
import { FaHammer, FaWrench, FaScrewdriver, FaPaintBrush, FaHardHat } from 'react-icons/fa';
import './Brands.css';

function Brands() {
  const brands = [
    { icon: <FaHammer />, name: "Makita" },
    { icon: <FaWrench />, name: "Bosch" },
    { icon: <FaScrewdriver />, name: "Black & Decker" },
    { icon: <FaPaintBrush />, name: "Titan" },
    { icon: <FaHardHat />, name: "3M" },
  ];

  return (
    <section className="brands-section">
      <div className="container">
        <h3 className="brands-title">Trabajamos con las mejores marcas</h3>
        <div className="brands-container">
          {brands.map((brand, index) => (
            <div key={index} className="brand-item">
              {brand.icon} <span>{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Brands;