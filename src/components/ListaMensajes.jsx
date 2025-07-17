function ListaMensajes({ mensajes, eliminarMensaje, modificarMensaje }) {
  return (
    <ul>
      {mensajes.map((mensaje, index) => (
        <li key={index}>
          <strong>{mensaje.nombre}:</strong> {mensaje.mensaje}
          <button onClick={() => eliminarMensaje(index)}>Eliminar</button>
          <button
            onClick={() => {
              const nuevoTexto = prompt('Nuevo mensaje:', mensaje.mensaje);
              if (nuevoTexto) {
                modificarMensaje(index, { ...mensaje, mensaje: nuevoTexto });
              }
            }}
          >
            Editar
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ListaMensajes;
