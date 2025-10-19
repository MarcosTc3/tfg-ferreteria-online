// src/components/CartPreview/CartPreview.jsx
import './CartPreview.css';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

function CartPreview() {
  const { cartItems } = useCart();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-preview">
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="cart-preview-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-preview-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <span className="item-name">{item.name}</span>
                  <span className="item-quantity-price">
                    {item.quantity} x {item.price.toFixed(2)}€
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-preview-footer">
            <div className="subtotal">
              <span>Subtotal:</span>
              <span>{subtotal.toFixed(2)}€</span>
            </div>
            <div className="cart-preview-buttons">
              <Link to="/carrito" className="btn-secondary">Ver Carrito</Link>
              <Link to="/finalizar-compra" className="btn-primary">Finalizar Compra</Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPreview;