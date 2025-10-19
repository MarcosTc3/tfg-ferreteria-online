// src/pages/FinalizarCompra.jsx
import './FinalizarCompra.css';
import { useCart } from '../context/CartContext';

function FinalizarCompra() {
  const { cartItems } = useCart();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Pedido realizado con éxito (simulación). ¡Gracias por tu compra!');
  };

  return (
    <div className="checkout-page-container">
      <div className="checkout-layout">
        <div className="checkout-form">
          <form onSubmit={handleSubmit}>
            <div className="checkout-section">
              <h2>Dirección de Envío</h2>
              <div className="form-row">
                <div className="form-group"><label>Nombre</label><input type="text" required /></div>
                <div className="form-group"><label>Apellidos</label><input type="text" required /></div>
              </div>
              <div className="form-group"><label>Dirección</label><input type="text" required /></div>
              <div className="form-row">
                <div className="form-group"><label>Código Postal</label><input type="text" required /></div>
                <div className="form-group"><label>Ciudad</label><input type="text" required /></div>
              </div>
            </div>

            <div className="checkout-section">
              <h2>Información de Pago (Simulación)</h2>
              <div className="form-group"><label>Número de Tarjeta</label><input type="text" placeholder="1234 5678 1234 5678" required /></div>
              <div className="form-row">
                <div className="form-group"><label>Fecha de Caducidad</label><input type="text" placeholder="MM/AA" required /></div>
                <div className="form-group"><label>CVC</label><input type="text" placeholder="123" required /></div>
              </div>
            </div>

            <button type="submit" className="place-order-btn">Realizar el Pedido</button>
          </form>
        </div>

        <aside className="checkout-summary">
          <h2>Resumen de tu Pedido</h2>
          {cartItems.map(item => (
            <div key={item.id} className="summary-item">
              <img src={item.image} alt={item.name} className="summary-item-image" />
              <div className="summary-item-info">
                <div>{item.name} (x{item.quantity})</div>
                <strong>{(item.price * item.quantity).toFixed(2)} €</strong>
              </div>
            </div>
          ))}
          <div className="summary-total-row">
            <span>Total</span>
            <span>{total.toFixed(2)} €</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default FinalizarCompra;