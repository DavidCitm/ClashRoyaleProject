import { useEffect, useState } from "react";
import { fetchTable } from "../pages/supabase";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import CardPersonaje from "../components/CardPersonaje";
import "./HomePage.css";

export default function HomePage() {
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [elixirFilter, setElixirFilter] = useState("");
  const [alphaOrder, setAlphaOrder] = useState(""); // "", "az", "za"

  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchTable("personajes");

      // ORDEN INICIAL POR ID
      data.sort((a, b) => a.id - b.id);

      setPersonajes(data);
      setLoading(false);
    }
    load();
  }, []);

  const clearFilters = () => {
    setSearchTerm("");
    setElixirFilter("");
    setAlphaOrder("");
  };

  const filtered = personajes
    .filter(p =>
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(p =>
      elixirFilter === "" || p.coste_elixir === Number(elixirFilter)
    )
    .slice()
    .sort((a, b) => {
      if (alphaOrder === "az") return a.nombre.localeCompare(b.nombre);
      if (alphaOrder === "za") return b.nombre.localeCompare(a.nombre);
      return a.id - b.id;
    });

  if (loading) return <p className="loading">Cargando cartas...</p>;

  return (
    <div className="homepage">

      {/* ================= FILTROS ================= */}
      <div className="filters-bar">

        {/* BUSCADOR */}
        <input
          type="text"
          placeholder="Buscar carta..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        {/* FILTROS DERECHA */}
        <div className="filters-right">

          <select
            value={elixirFilter}
            onChange={(e) => setElixirFilter(e.target.value)}
            className="elixir-select"
          >
            <option value="">Todos</option>
            {[...Array(11).keys()].map(num => (
              <option key={num} value={num}>
                {num} Elixir
              </option>
            ))}
          </select>

          <button
            className={`order-btn ${alphaOrder === "az" ? "active" : ""}`}
            onClick={() => setAlphaOrder("az")}
          >
            A-Z
          </button>

          <button
            className={`order-btn ${alphaOrder === "za" ? "active" : ""}`}
            onClick={() => setAlphaOrder("za")}
          >
            Z-A
          </button>

          <button className="clear-btn" onClick={clearFilters}>
            Limpiar
          </button>

        </div>
      </div>

      {/* ================= CARTAS ================= */}
      <div className="cards-container">
        {filtered.map((p) => (
          <div key={p.id} className="card-wrapper">

            <Link
              to={`/personaje/${p.id}`}
              style={{ textDecoration: "none" }}
            >
              <CardPersonaje {...p} />
            </Link>

            {/* FAVORITO (no navega) */}
            <button
              className="favorite-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(p);
              }}
            >
              {isFavorite(p.id) ? "★" : "☆"}
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}
