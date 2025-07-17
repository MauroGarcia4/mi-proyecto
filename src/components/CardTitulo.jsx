import React from "react";

function CardTitulo({ titulo, index, eliminarTitulo, modificarTitulo }) {
  
  const handleEditar = () => {
    const nuevoTorneo = prompt('Nuevo nombre del torneo:', titulo.torneo);
    if (!nuevoTorneo || nuevoTorneo.trim() === '') {
      alert('El nombre del torneo no puede estar vacío.');
      return;
    }

    const nuevoAnio = prompt('Nuevo año:', titulo.anio);
    if (!nuevoAnio || nuevoAnio.trim() === '') {
      alert('El año no puede estar vacío.');
      return;
    }

    modificarTitulo(index, { torneo: nuevoTorneo.trim(), anio: nuevoAnio.trim() });
  };

  return (
    <div className="card">
      <h3>{titulo.torneo}</h3>
      <p>{titulo.anio}</p>

      <button onClick={() => eliminarTitulo(index)}>Eliminar</button>
      <button onClick={handleEditar}>Editar</button>
    </div>
  );
}

export default CardTitulo;
