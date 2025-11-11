// src/pages/FinalizarCompra.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext'; // 1. Importamos useCart
import { useAuth } from '../context/AuthContext'; // 2. Importamos useAuth
import './FinalizarCompra.css';

function FinalizarCompra() {
  // 3. Obtenemos lo que necesitamos de nuestros "cerebros"
  const { cartItems, clearCart } = useCart();
  const { token, user } = useAuth(); // 'token' para autorización, 'user' para pre-rellenar
  const navigate = useNavigate();

  // 4. Estado para el formulario de envío
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
  });

  // 5. Estado para el formulario de pago (simulado)
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  });

  // Calcular el precio total desde el carrito
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Manejador para los cambios en los inputs
  const onChangeShipping = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };
  const onChangePayment = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  // 6. ¡LA FUNCIÓN CLAVE! Se ejecuta al pulsar "Realizar el Pedido"
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 7. Formateamos los productos del carrito al formato que espera nuestro "molde"
    const orderItems = cartItems.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
      product: item.id, // Guardamos el ID del producto
    }));

    // 8. Preparamos el objeto completo del pedido
    const orderData = {
      orderItems: orderItems,
      shippingAddress: shippingAddress,
      totalPrice: totalPrice,
      // El ID del usuario se saca del token en el backend
    };

    // 9. Preparamos los 'headers' con el token de autorización
    const config = {
      headers: {
        'x-auth-token': token,
      },
    };

    try {
      // 10. Llamamos a nuestro endpoint del backend
      await axios.post('http://localhost:5000/api/orders', orderData, config);

      // 11. ¡ÉXITO!
      alert('¡Pedido realizado con éxito!');
      clearCart(); // Vaciamos el carrito
      navigate('/pedidos'); // Redirigimos al usuario a la página "Mis Pedidos"

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

            {/* --- SECCIÓN DE ENVÍO --- */}
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

            {/* --- SECCIÓN DE PAGO (SIMULADA) --- */}
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

        {/* --- RESUMEN DEL PEDIDO --- */}
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
            <span>{totalPrice.toFixed(2)} €</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default FinalizarCompra;