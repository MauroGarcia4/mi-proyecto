import React from "react";

function CardJugador({ jugador, index, eliminarJugador, modificarJugador }) {
  
  const handleEditar = () => {
    const nuevoNombre = prompt('Nuevo nombre:', jugador.nombre);
    if (!nuevoNombre || nuevoNombre.trim() === '') {
      alert('El nombre no puede estar vacío.');
      return;
    }

    const nuevaPosicion = prompt('Nueva posición:', jugador.posicion);
    if (!nuevaPosicion || nuevaPosicion.trim() === '') {
      alert('La posición no puede estar vacía.');
      return;
    }

    modificarJugador(index, { nombre: nuevoNombre.trim(), posicion: nuevaPosicion.trim() });
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
