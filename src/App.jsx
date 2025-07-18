import './App.css';
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

  const [titulos, setTitulos] = useState(() => {
    const guardado = localStorage.getItem('titulos');
    return guardado ? JSON.parse(guardado) : titulosData;
  });

  const [jugadoresState, setJugadoresState] = useState(() => {
    const guardado = localStorage.getItem('jugadores');
    return guardado ? JSON.parse(guardado) : jugadores;
  });

  const [busquedaTitulo, setBusquedaTitulo] = useState('');
  const [busquedaJugador, setBusquedaJugador] = useState('');

  const titulosFiltrados = titulos.filter(titulo =>
    titulo.torneo.toLowerCase().includes(busquedaTitulo.toLowerCase())
  );

  const jugadoresFiltrados = jugadoresState.filter(jugador =>
    jugador.nombre.toLowerCase().includes(busquedaJugador.toLowerCase())
  );

  useEffect(() => {
    localStorage.setItem('mensajes', JSON.stringify(mensajes));
  }, [mensajes]);

  useEffect(() => {
    localStorage.setItem('titulos', JSON.stringify(titulos));
  }, [titulos]);

  useEffect(() => {
    localStorage.setItem('jugadores', JSON.stringify(jugadoresState));
  }, [jugadoresState]);

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

  const agregarTitulo = () => {
    const nuevoTorneo = prompt('Nombre del torneo:');
    if (!nuevoTorneo || nuevoTorneo.trim() === '') {
      alert('El nombre del torneo no puede estar vacío.');
      return;
    }

    const nuevoAnio = prompt('Año del torneo:');
    if (!nuevoAnio || nuevoAnio.trim() === '') {
      alert('El año no puede estar vacío.');
      return;
    }

    for (let i = 0; i < nuevoAnio.length; i++) {
      const c = nuevoAnio[i]
      if (c < '0' || c > '9') {
        alert('El año debe contener sólo números.')
        return
      }
    }

    setTitulos([...titulos, { torneo: nuevoTorneo.trim(), anio: nuevoAnio.trim() }]);
  };

  const eliminarTitulo = (index) => {
    const copia = [...titulos];
    copia.splice(index, 1);
    setTitulos(copia);
  };

  const modificarTitulo = (index, nuevoTitulo) => {
    if (
      !nuevoTitulo.torneo ||
      nuevoTitulo.torneo.trim() === '' ||
      !nuevoTitulo.anio ||
      nuevoTitulo.anio.trim() === ''
    ) {
      alert('El torneo y el año no pueden estar vacíos.');
      return;
    }

    for (let i = 0; i < nuevoTitulo.anio.length; i++) {
      const c = nuevoTitulo.anio[i]
      if (c < '0' || c > '9') {
        alert('El año debe contener sólo números.')
        return
      }
    }

    const copia = [...titulos];
    copia[index] = { torneo: nuevoTitulo.torneo.trim(), anio: nuevoTitulo.anio.trim() };
    setTitulos(copia);
  };

  const agregarJugador = () => {
    const nuevoNombre = prompt('Nombre del jugador:');
    if (!nuevoNombre || nuevoNombre.trim() === '') {
      alert('El nombre del jugador no puede estar vacío.');
      return;
    }

    const nuevaPosicion = prompt('Posición:');
    if (!nuevaPosicion || nuevaPosicion.trim() === '') {
      alert('La posición no puede estar vacía.');
      return;
    }

    setJugadoresState([...jugadoresState, { nombre: nuevoNombre.trim(), posicion: nuevaPosicion.trim() }]);
  };

  const eliminarJugador = (index) => {
    const copia = [...jugadoresState];
    copia.splice(index, 1);
    setJugadoresState(copia);
  };

  const modificarJugador = (index, nuevoJugador) => {
    if (
      !nuevoJugador.nombre ||
      nuevoJugador.nombre.trim() === '' ||
      !nuevoJugador.posicion ||
      nuevoJugador.posicion.trim() === ''
    ) {
      alert('El nombre y la posición no pueden estar vacíos.');
      return;
    }

    const copia = [...jugadoresState];
    copia[index] = { nombre: nuevoJugador.nombre.trim(), posicion: nuevoJugador.posicion.trim() };
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
          value={busquedaTitulo}
          onChange={(e) => setBusquedaTitulo(e.target.value)}
          className="buscador"
        />
        <button onClick={agregarTitulo}>Agregar Título</button>
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
        <input
          type="text"
          placeholder="Buscar jugador..."
          value={busquedaJugador}
          onChange={(e) => setBusquedaJugador(e.target.value)}
          className="buscador"
        />
        <button onClick={agregarJugador}>Agregar Jugador</button>
        <div className="grid">
          {jugadoresFiltrados.map((jugador, i) => (
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
