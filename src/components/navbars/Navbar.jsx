import { useState } from "react";

export const Navbar = ({ onFiltrar }) => {
  const [categorias] = useState(["Todos", "Tecnología", "Taller", "Práctica Supervisada"]);

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between shadow-md">
      <div className="text-xl font-bold mb-2 md:mb-0">Mi Blog</div>

      <div className="flex gap-4 flex-wrap">
        <button onClick={() => onFiltrar("Todos")} className="hover:underline"> Publicaciones</button>
      </div>

      <div className="mt-3 md:mt-0">
        <select
          className="bg-white text-black px-3 py-1 rounded"
          onChange={(e) => onFiltrar(e.target.value)}
        >
          {categorias.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
    </nav>
  );
};
