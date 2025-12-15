import { useEffect, useState } from "react";
import { fetchTable } from "../pages/supabase";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import CardPersonaje from "../components/CardPersonaje";
import "./HomePage.css";

export default function HomePage() {
  // ===== ESTADOS ===== 

  // Lista de cartas/personajes
  const [personajes, setPersonajes] = useState([]);

  // Estado de carga
  const [loading, setLoading] = useState(true);

  // Filtros
  const [searchTerm, setSearchTerm] = useState("");   // texto de búsqueda
  const [elixirFilter, setElixirFilter] = useState(""); // filtro por coste

  // Favoritos (context)
  const { toggleFavorite, isFavorite } = useFavorites();


  // ===== CARGA DE DATOS =====

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchTable("personajes"); // obtener cartas desde Supabase
      setPersonajes(data);
      setLoading(false);
    }

    load();
  }, []);

  // Mientras carga muestra mensaje
  if (loading) return <p>Cargando datos...</p>;


  //  ===== RENDER =====

  return (
    <div className="homepage">
      {/* Overlay decorativo del fondo */}
      <div className="homepage-overlay"></div>

      <h1>Cartas</h1>

      {/* FILTROS */}
      <div className="filters">
        {/* Buscador por nombre */}
        <input
          type="text"
          placeholder="Buscar carta..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        {/* Filtro por coste de elixir */}
        <select
          value={elixirFilter}
          onChange={(e) => setElixirFilter(e.target.value)}
          className="elixir-select"
        >
          <option value="">Todos</option>
          {[...Array(11).keys()].map((num) => (
            <option key={num} value={num}>
              {num} Elixir
            </option>
          ))}
        </select>
      </div>

      {/* GRID DE CARTAS */}
      <div className="cards-container">
        {personajes
          // Filtrar por nombre
          .filter((p) =>
            p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
          )
          // Filtrar por coste de elixir
          .filter(
            (p) =>
              elixirFilter === "" ||
              p.coste_elixir === Number(elixirFilter)
          )
          .map((p) => (
            <div key={p.id} className="card-wrapper">

              {/* Carta clickeable (rout a detalle) */}
              <Link
                to={`/personaje/${p.id}`}
                state={{ personaje: p }}
                style={{ textDecoration: "none" }}
              >
                <CardPersonaje {...p} />
              </Link>

              {/* Boton de favoritos */}
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
