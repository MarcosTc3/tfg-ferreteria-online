// src/App.jsx
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        {/* El contenido de cada página (Inicio, Tienda, etc.) irá aquí */}
        <h2>Contenido Principal</h2>
      </main>
      <Footer />
    </>
  )
}

export default App