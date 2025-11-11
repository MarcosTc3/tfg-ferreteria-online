// src/pages/FinalizarCompra.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './FinalizarCompra.css';

function FinalizarCompra() {
  const { cartItems, clearCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  });

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const onChangeShipping = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };
  const onChangePayment = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderItems = cartItems.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
      product: item.id,
    }));

    const orderData = {
      orderItems: orderItems,
      shippingAddress: shippingAddress,
      totalPrice: totalPrice,
    };

    const config = {
      headers: {
        'x-auth-token': token,
      },
    };

    try {
      await axios.post('http://localhost:5000/api/orders', orderData, config);

      // ¡ALERTA ELIMINADA!
      clearCart();
      navigate('/pedidos'); // La redirección a "Mis Pedidos" es la confirmación

    } catch (err) {
      console.error('Error al crear el pedido:', err.response?.data);
      alert('Error al procesar el pedido. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <div className="checkout-page-container">
      <div className="checkout-layout">
        <div className="checkout-form">
          <form onSubmit={handleSubmit}>
            {/* ... (el resto del formulario JSX sigue igual) ... */}
            <div className="checkout-section">
              <h2>Dirección de Envío</h2>
              <div className="form-group">
                <label>Dirección</label>
                <input type="text" name="address" value={shippingAddress.address} onChange={onChangeShipping} required />
              </div>
              <div className="form-row">
                <div className="form-group"><label>Ciudad</label><input type="text" name="city" value={shippingAddress.city} onChange={onChangeShipping} required /></div>
                <div className="form-group"><label>Código Postal</label><input type="text" name="postalCode" value={shippingAddress.postalCode} onChange={onChangeShipping} required /></div>
              </div>
            </div>

            <div className="checkout-section">
              <h2>Información de Pago (Simulación)</h2>
              <div className="form-group">
                <label>Número de Tarjeta</label>
                <input type="text" name="cardNumber" value={paymentInfo.cardNumber} onChange={onChangePayment} placeholder="1234 5678 1234 5678" required />
              </div>
              <div className="form-row">
                <div className="form-group"><label>Fecha de Caducidad</label><input type="text" name="expiryDate" value={paymentInfo.expiryDate} onChange={onChangePayment} placeholder="MM/AA" required /></div>
                <div className="form-group"><label>CVC</label><input type="text" name="cvc" value={paymentInfo.cvc} onChange={onChangePayment} placeholder="123" required /></div>
              </div>
            </div>

            <button type="submit" className="place-order-btn">Realizar el Pedido</button>
          </form>
        </div>

        <aside className="checkout-summary">
           {/* ... (el resumen del pedido JSX sigue igual) ... */}
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
            <span>{totalPrice.toFixed(2)} €</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default FinalizarCompra;