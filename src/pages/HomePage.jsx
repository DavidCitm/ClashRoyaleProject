import { useEffect, useState } from "react";
import { fetchTable } from "../pages/supabase";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import CardPersonaje from "../components/CardPersonaje";
import "./HomePage.css";

export default function HomePage() {
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [elixirFilter, setElixirFilter] = useState("");

  // Favoritos
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchTable("personajes");
      setPersonajes(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <p>Cargando datos...</p>;

  return (
    <div className="homepage">
      <h1>Cartas</h1>

      {/* FILTROS */}
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar carta..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={elixirFilter}
          onChange={e => setElixirFilter(e.target.value)}
          className="elixir-select"
        >
          <option value="">Todos</option>
          {[...Array(11).keys()].map(num => (
            <option key={num} value={num}>
              {num} Elixir
            </option>
          ))}
        </select>
      </div>

      {/* CARTAS */}
      <div className="cards-container">
        {personajes
          .filter(p => p.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
          .filter(p => elixirFilter === "" || p.coste_elixir === Number(elixirFilter))
          .map(p => (
            <div key={p.id} className="card-wrapper">

              {/* Carta clickeable */}
              <Link
                to={`/personaje/${p.id}`}
                state={{ personaje: p }}
                style={{ textDecoration: "none" }}
              >
                <CardPersonaje {...p} />
              </Link>

              {/* Botón de favoritos */}
              <button
                className="favorite-btn"
                onClick={() => toggleFavorite(p)}
              >
                {isFavorite(p.id) ? "★" : "☆"}
              </button>

            </div>
          ))}
      </div>
    </div>
  );
}
