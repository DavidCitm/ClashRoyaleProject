import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardPersonaje from "../components/CardPersonaje";
import "./HomePage.css";

export default function HomePage() {
  const [arenas, setArenas] = useState([]);
  const [niveles, setNiveles] = useState([]);
  const [personajes, setPersonajes] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [elixirFilter, setElixirFilter] = useState("");


  useEffect(() => {
    async function loadData() {
      setLoading(true);

      // URL y Key de la API en Supabase
      const API_URL = "https://yrpaahgwlhuvwsvgzdau.supabase.co/rest/v1/";
      const API_KEY = "sb_publishable_D0iDnQVwzQt1_XzxDIkbmw_80jfFsMU";

      // Función reutilizable para pedir cualquier tabla
      async function fetchTable(table) {
        
        // Fetch de la tabla en concreto, basicamente pilla la URL y la tabla que necesitamos "fetchear"
        const res = await fetch(API_URL + table, {
          // Headers obligatorios para que Supabase deje acceder
          headers: {
            apikey: API_KEY,                     // identifica la petición
            Authorization: `Bearer ${API_KEY}`   // autorización tipo "Bearer"
          }
        });

        // Convertimos la respuesta a JSON
        return res.json();
      }

      // Llamamos a cada tabla usando la función del fetch
      const arenasData = await fetchTable("arenas");
      const nivelesData = await fetchTable("niveles");
      const personajesData = await fetchTable("personajes");
      const statsData = await fetchTable("personaje_stats");

      //Guardamos todo en estado
      setArenas(arenasData);
      setNiveles(nivelesData);
      setPersonajes(personajesData);
      setStats(statsData);

      // Para mirar cuando termina de cargar
      setLoading(false);
    }

    //Carga
    loadData();
  }, []);

  if (loading) return <p>Cargando datos...</p>;

  return (
    <div className="homepage">
      <h1>Cartas</h1>

      {/* Buscador + Filtro */}
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
            <option key={num} value={num}>
              {num} Elixir
            </option>
          ))}
        </select>
      </div>

      {/* Render de cartas */}
      <div className="cards-container">
        {personajes
          // Filtrar por nombre
          .filter((p) =>
            p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
          )
          // Filtrar por coste de elixir
          .filter((p) =>
            elixirFilter === "" ? true : p.coste_elixir === Number(elixirFilter)
          )
          // Mostrar Cards
          .map((p) => (
            <Link
              key={p.id}
              to={`/personaje/${p.id}`}
              state={{ 
                personaje: p,
                stats: stats.filter(s => s.id_personaje === p.id) // solo los stats de este personaje
              }}
              style={{ textDecoration: "none" }}
            >
              <CardPersonaje
                nombre={p.nombre}
                imagen_url={p.imagen_url}
                rareza={p.rareza}
                coste_elixir={p.coste_elixir}
              />
            </Link>


          ))}
      </div>
    </div>
  );
}
