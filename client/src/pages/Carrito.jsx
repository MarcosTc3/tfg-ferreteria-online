// src/pages/Carrito.jsx

import './Carrito.css';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Carrito() {
  const { cartItems, removeFromCart, updateItemQuantity } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page-container">
      <header className="cart-page-header">
        <h1>Tu Carrito de Compra</h1>
      </header>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Tu carrito está vacío.</p>
      ) : (
        <div className="cart-layout">
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <div className="quantity-controls">
                    {/* --- BOTÓN MENOS CON LÓGICA DE DESACTIVACIÓN --- */}
                    <button 
                      onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1} // Se deshabilita si la cantidad es 1
                    >-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="remove-item-btn">
                    Eliminar
                  </button>
                </div>
                <div className="cart-item-price">
                  {(item.price * item.quantity).toFixed(2)} €
                </div>
              </div>
            ))}
          </div>

          <aside className="order-summary">
            <h2>Resumen del Pedido</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{total.toFixed(2)} €</span>
            </div>
            <div className="summary-row">
              <span>Envío</span>
              <span>A calcular</span>
            </div>
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>{total.toFixed(2)} €</span>
            </div>
            <Link to="/finalizar-compra" className="checkout-btn">
              Finalizar Compra
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}

export default Carrito;