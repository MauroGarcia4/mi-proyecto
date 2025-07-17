import { useState } from "react";

function FormFan({ agregarMensaje }) {
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      alert("Por favor, ingresa tu nombre.");
      return;
    }
    if (!mensaje.trim()) {
      alert("Por favor, ingresa tu mensaje.");
      return;
    }

    agregarMensaje({ nombre: nombre.trim(), mensaje: mensaje.trim() });
    setNombre("");
    setMensaje("");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Tu nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <textarea
        placeholder="Tu mensaje"
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
      ></textarea>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default FormFan;
