function CardJugador({ jugador, index, eliminarJugador, modificarJugador }) {
  const handleEditar = () => {
    const nuevoNombre = prompt('Nuevo nombre:', jugador.nombre);
    const nuevaPosicion = prompt('Nueva posición:', jugador.posicion);
    if (nuevoNombre && nuevaPosicion) {
      modificarJugador(index, { nombre: nuevoNombre, posicion: nuevaPosicion });
    }
  };

  return (
    <div className="card">
      <h3>{jugador.nombre}</h3>
      <p>{jugador.posicion}</p>
      <button onClick={() => eliminarJugador(index)}>Eliminar</button>
      <button onClick={handleEditar}>Editar</button>
    </div>
  );
}

export default CardJugador;
