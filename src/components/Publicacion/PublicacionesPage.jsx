import { Navbar } from "../Navbars/Navbar";
import { useState } from "react";
import { usePublicacionView,
         useComentarioAdd,
         useComentarioWiew
} from "../../shared/hooks";
import { ListaComentarios } from "../comentario/ListaComentarios";

export const PublicacionesPage = () => {
  const { publication, isLoading } = usePublicacionView()
  const [filtro, setFiltro] = useState("Todos")
  
  const { saveComentario } = useComentarioAdd()
  const { comentarios, fetchComentarios } = useComentarioWiew()

  const [formVisibleId, setFormVisibleId] = useState(null)
  const [nombre, setNombre] = useState("")
  const [contenido, setContenido] = useState("")

  const publicacionesFiltradas = filtro === "Todos" 
    ? publication 
    : publication.filter(publi => publi.categoria.categoria === filtro)

  const toggleFormulario = async (id) => {
    if (formVisibleId === id) {
      setFormVisibleId(null)
    } else {
      setFormVisibleId(id)
      await fetchComentarios(id)
    }
  }

  const enviarComentario = async (id) => {
    if (!contenido.trim()) return

    const comentarioData = {
      nombre: nombre.trim() === '' ? 'Anonymous' : nombre.trim(),
      contenido: contenido.trim()
    }

    await saveComentario(id, comentarioData)
    await fetchComentarios(id)
    setNombre("")
    setContenido("")
  }
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#71C0BB' }}>      
      <Navbar onFiltrar={setFiltro} />
    
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-center text-[#332D56] mb-6">
          Publicaciones - {filtro}
        </h2>
    
        {isLoading ? (
          <p className="text-center text-gray-600">Cargando publicaciones...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicacionesFiltradas.map((publi) => (
              <div
                key={publi._id}
                className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-bold text-[#4E6688] mb-2">
                  {publi.titulo}
                </h3>
                <p className="text-gray-700 mb-2">{publi.descripcion}</p>
                <p className="text-sm text-gray-500 mb-4">
                  Categoría:{" "}
                  <span className="font-semibold text-[#71C0BB]">
                    {publi.categoria.categoria}
                  </span>
                </p>
            
                <button
                  onClick={() => toggleFormulario(publi._id)}
                  className="bg-[#71C0BB] hover:bg-[#4E6688] text-white px-4 py-2 rounded shadow"
                >
                  {formVisibleId === publi._id ? "Ocultar Comentario" : "Agregar Comentario"}
                </button>
                {formVisibleId === publi._id && (
                  <div className="mt-4 space-y-3 bg-[#E3EEB2] p-4 rounded-lg shadow-md">
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="w-full border border-[#332D56] rounded px-3 py-2"
                    />
                    <textarea
                      placeholder="Tu comentario"
                      value={contenido}
                      onChange={(e) => setContenido(e.target.value)}
                      className="w-full border border-[#332D56] rounded px-3 py-2"
                    />
                    <button
                      onClick={() => enviarComentario(publi._id)}
                      className="bg-[#4E6688] hover:bg-[#332D56] text-white px-4 py-2 rounded"
                    >
                      Enviar Comentario
                    </button>
                
                    <ListaComentarios
                        comentarios={comentarios}
                        fetchComentarios={fetchComentarios}
                        idPublicacion={publi._id}
                        nombre={nombre}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
