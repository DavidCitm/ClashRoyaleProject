import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { Link } from "react-router-dom";
import CardPersonaje from "../components/CardPersonaje";
import "./HomePage.css";

export default function HomePage() {
  // Obtenemos los datos del Datacontext
  const { personajes, stats, loading } = useContext(DataContext);

  // Estados locales para los filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [elixirFilter, setElixirFilter] = useState("");

  // mensaje para cuando los datos se cargan
  if (loading) return <p>Cargando datos...</p>;

  return (
    <div className="homepage">
      <h1>Cartas</h1>

      {/* Busqueda y el filtro de elixir */}
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar carta..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={elixirFilter}
          onChange={(e) => setElixirFilter(e.target.value)}
          className="elixir-select"
        >
          <option value="">Todos</option>
          {[...Array(11).keys()].map((num) => (
            <option key={num} value={num}>{num} Elixir</option>
          ))}
        </select>
      </div>

      {/* Las cartas haciendo caso al filtrado */}
      <div className="cards-container">
        {personajes

          // Filtrar por nombre
          .filter(p => p.nombre.toLowerCase().includes(searchTerm.toLowerCase()))

          // Filtrar por coste de elixir
          .filter(p => elixirFilter === "" || p.coste_elixir === Number(elixirFilter))

          // Renderizar cada carta con Link a su detalle
          .map(p => (
            <Link
              key={p.id}
              to={`/personaje/${p.id}`}
              state={{ personaje: p,}}
              style={{ textDecoration: "none" }}
            >
              <CardPersonaje {...p} />
            </Link>
          ))}
      </div>
    </div>
  );
}
