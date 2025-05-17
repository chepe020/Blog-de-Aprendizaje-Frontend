import { useState } from "react";

export const Navbar = ({ onFiltrar }) => {
  const [categorias] = useState(["Todos", "Tecnología", "Taller", "Práctica Supervisada"]);

  return (
  <nav className="font-mono  bg-[#332D56] text-white px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between shadow-md">
    <div className="text-2xl font-bold mb-2 md:mb-0 tracking-wide">Mi Blog</div>

    <div className="flex gap-4 flex-wrap">
      <button onClick={() => onFiltrar("Todos")} class="font-mono text-[#E3EEB2]">
        Publicaciones
      </button>
    </div>

    <div className="mt-3 md:mt-0">
      <select
        className="bg-white text-[#332D56] px-3 py-1 rounded shadow"
        onChange={(e) => onFiltrar(e.target.value)}
      >
        {categorias.map((cat, i) => (
          <option key={i} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  </nav>
  )
}
