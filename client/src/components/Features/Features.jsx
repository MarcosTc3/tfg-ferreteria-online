// src/components/Features/Features.jsx
import { FaShippingFast, FaLock, FaHeadset, FaUndo } from 'react-icons/fa';
import './Features.css'; // Importa el CSS

function Features() {
  const features = [
    { icon: <FaShippingFast />, title: "Envío Rápido", text: "Entrega en 24/48h" },
    { icon: <FaLock />, title: "Pago Seguro", text: "100% Protegido" },
    { icon: <FaHeadset />, title: "Soporte Experto", text: "Te asesoramos" },
    { icon: <FaUndo />, title: "Devoluciones", text: "15 días de garantía" },
  ];

  return (
    <div className="features-section">
      <div className="features-grid">
        {features.map((f, i) => (
          <div key={i} className="feature-item">
            <div className="feature-icon">{f.icon}</div>
            <div className="feature-text">
              <h4>{f.title}</h4>
              <p>{f.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;