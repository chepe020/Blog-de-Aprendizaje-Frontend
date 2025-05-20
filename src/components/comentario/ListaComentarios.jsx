import { useState } from "react";
import { useComentarioDelete, useComentarioUpdate } from "../../shared/hooks";

export const ListaComentarios = ({ comentarios, fetchComentarios, idPublicacion, nombre }) => {
  const [comentarioEditandoId, setComentarioEditandoId] = useState(null);

  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoContenido, setNuevoContenido] = useState("");

  const { eliminarComentario } = useComentarioDelete();
  const { editarComentario } = useComentarioUpdate();

  const handleEliminarComentario = async (idComentario) => {
    await eliminarComentario(idComentario);
    await fetchComentarios(idPublicacion);
  };

  const handleActualizarComentario = async (idComentario) => {
    if (!nuevoContenido.trim()) return;

    await editarComentario(idComentario, {
      nombre: nuevoNombre.trim() === "" ? "Anonymous" : nuevoNombre.trim(),
      contenido: nuevoContenido.trim(),
    });


    setComentarioEditandoId(null);
    setNuevoContenido("");
    await fetchComentarios(idPublicacion);
  };

  return (
    <ul className="space-y-4 mt-4">
      {comentarios.map((comentario) => (
        <li
          key={comentario._id}
          className="border border-[#332D56] bg-[#E3EEB2] p-4 rounded-lg shadow-sm"
        >
          <p className="text-sm text-[#332D56] font-bold">{comentario.nombre}</p>
          {comentarioEditandoId === comentario._id ? (
            <>
              <input
                type="text"
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
                className="w-full border mt-2 p-2 rounded"
                placeholder="Tu nombre"
              />
              <textarea
                value={nuevoContenido}
                onChange={(e) => setNuevoContenido(e.target.value)}
                className="w-full border mt-2 p-2 rounded"
                placeholder="Tu comentario"
              />
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleActualizarComentario(comentario._id)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Guardar
                </button>
                <button
                  onClick={() => {
                    setComentarioEditandoId(null);
                    setNuevoContenido("");
                    setNuevoNombre("")
                  }}
                  className="bg-gray-400 text-white px-3 py-1 rounded"
                >
                  Cancelar
                </button>
              </div>
            </>
          ) : (

            <>
              <p className="text-gray-800">{comentario.contenido}</p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => {
                    setComentarioEditandoId(comentario._id);
                    setNuevoContenido(comentario.contenido);
                    setNuevoNombre(comentario.nombre);
                  }}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleEliminarComentario(comentario._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Eliminar
                </button>
              </div>
            </>
          )}

          <p className="text-xs text-[#4E6688] mt-2">
            {new Date(comentario.createdAt).toLocaleString()}
          </p>
        </li>
      ))}
    </ul>
  )
}
