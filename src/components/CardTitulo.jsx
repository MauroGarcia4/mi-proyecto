function CardTitulo({ titulo, index, eliminarTitulo, modificarTitulo }) {
  const handleEditar = () => {
    const nuevoTorneo = prompt('Nuevo nombre del torneo:', titulo.torneo);
    const nuevoAnio = prompt('Nuevo año:', titulo.anio);
    if (nuevoTorneo && nuevoAnio) {
      modificarTitulo(index, { torneo: nuevoTorneo, anio: nuevoAnio });
    }
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
