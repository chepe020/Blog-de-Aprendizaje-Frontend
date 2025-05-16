import { Navbar } from "../Navbars/Navbar";
import { useState } from "react";
import { usePublicacionView } from "../../shared/hooks/usePublicacionView";

export const PublicacionesPage = () => {
  const { publication, isLoading } = usePublicacionView();
  const [filtro, setFiltro] = useState("Todos");

  const publicacionesFiltradas =
    filtro === "Todos"
      ? publication
      : publication.filter(publi => publi.categoria.categoria === filtro);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar onFiltrar={setFiltro} />

      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
           Publicaciones - {filtro}
        </h2>

        {isLoading ? (
          <p className="text-center text-gray-600">Cargando publicaciones...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicacionesFiltradas.map((publi) => (
              <div
                key={publi._id}
                className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
              >
                <h3 className="text-xl font-bold text-blue-800 mb-2">
                  {publi.titulo}
                </h3>
                <p className="text-gray-700 mb-2">{publi.descripcion}</p>
                <p className="text-sm text-gray-500 mb-4">
                  Categoría:{" "}
                  <span className="font-semibold text-blue-600">
                    {publi.categoria.categoria}
                  </span>
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => console.log("Agregar comentario", publi._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Agregar Comentario
                  </button>
                  <button
                    onClick={() => console.log("Ver comentarios", publi._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Ver Comentarios
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
