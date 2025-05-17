export const ListaComentarios = ({ comentarios }) => {
  if (!comentarios || comentarios.length === 0) {
    return <p className="text-gray-500">No hay comentarios aún.</p>;
  }

  return (
  <ul className="space-y-4 mt-4">
    {comentarios.map((comentario) => (
      <li
        key={comentario._id}
        className="border border-[#332D56] bg-[#E3EEB2] p-4 rounded-lg shadow-sm"
      >
        <p className="text-sm text-[#332D56]">
          <span className="font-bold text-[#4E6688]">{comentario.nombre}</span>:{" "}
          {comentario.contenido}
        </p>
        <p className="text-xs text-[#4E6688] mt-1">
          {new Date(comentario.createdAt).toLocaleString()}
        </p>
      </li>
    ))}
  </ul>
  )
}
