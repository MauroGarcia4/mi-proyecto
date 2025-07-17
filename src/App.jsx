import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import CardTitulo from './components/CardTitulo';
import CardJugador from './components/CardJugador';
import FormFan from './components/FormFan';
import ListaMensajes from './components/ListaMensajes';

import titulosData from './data/titulos';
import jugadores from './data/jugadores';
import { useState, useEffect } from 'react';

function App() {
  const [mensajes, setMensajes] = useState(() => {
    const guardado = localStorage.getItem('mensajes');
    return guardado ? JSON.parse(guardado) : [];
  });

  const [titulos, setTitulos] = useState(titulosData);
  const [jugadoresState, setJugadoresState] = useState(jugadores);

  const [busqueda, setBusqueda] = useState('');
  const [titulosFiltrados, setTitulosFiltrados] = useState(titulosData);

  useEffect(() => {
    localStorage.setItem('mensajes', JSON.stringify(mensajes));
  }, [mensajes]);

  useEffect(() => {
    const resultado = titulos.filter(titulo =>
      titulo.torneo.toLowerCase().includes(busqueda.toLowerCase())
    );
    setTitulosFiltrados(resultado);
  }, [busqueda, titulos]);

  const agregarMensaje = (nuevo) => {
    setMensajes([...mensajes, nuevo]);
  };

  const eliminarMensaje = (index) => {
    const copia = [...mensajes];
    copia.splice(index, 1);
    setMensajes(copia);
  };

  const modificarMensaje = (index, nuevoTexto) => {
    const copia = [...mensajes];
    copia[index] = nuevoTexto;
    setMensajes(copia);
  };

  const eliminarTitulo = (index) => {
    const copia = [...titulos];
    copia.splice(index, 1);
    setTitulos(copia);
  };

  const modificarTitulo = (index, nuevoTitulo) => {
    const copia = [...titulos];
    copia[index] = nuevoTitulo;
    setTitulos(copia);
  };

  const eliminarJugador = (index) => {
    const copia = [...jugadoresState];
    copia.splice(index, 1);
    setJugadoresState(copia);
  };

  const modificarJugador = (index, nuevoJugador) => {
    const copia = [...jugadoresState];
    copia[index] = nuevoJugador;
    setJugadoresState(copia);
  };

  return (
    <div className="app">
      <Header />

      <section className="seccion">
        <h2>Títulos importantes</h2>
        <input
          type="text"
          placeholder="Buscar torneo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="buscador"
        />
        <div className="grid">
          {titulosFiltrados.map((titulo, i) => (
            <CardTitulo
              key={i}
              titulo={titulo}
              index={i}
              eliminarTitulo={eliminarTitulo}
              modificarTitulo={modificarTitulo}
            />
          ))}
        </div>
      </section>

      <section className="seccion">
        <h2>Jugadores históricos</h2>
        <div className="grid">
          {jugadoresState.map((jugador, i) => (
            <CardJugador
              key={i}
              jugador={jugador}
              index={i}
              eliminarJugador={eliminarJugador}
              modificarJugador={modificarJugador}
            />
          ))}
        </div>
      </section>

      <section className="seccion">
        <h2>Dejá tu mensaje como hincha</h2>
        <FormFan agregarMensaje={agregarMensaje} />
        <ListaMensajes
          mensajes={mensajes}
          eliminarMensaje={eliminarMensaje}
          modificarMensaje={modificarMensaje}
        />
      </section>

      <Footer />
    </div>
  );
}

export default App;
