import './Header.css';

function Header() {
  return (
    <header>
      <div>
        {/* Aquí irá el logo en el futuro */}
        <h2>MiFerretería</h2>
      </div>
      <nav>
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/tienda">Tienda</a></li>
          <li><a href="/servicios">Servicios</a></li>
          <li><a href="/contacto">Contacto</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;