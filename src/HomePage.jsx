import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import CardPersonaje from "./components/CardPersonaje";
import './HomePage.css';


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

      const { data: arenasData } = await supabase.from("arenas").select("*");
      const { data: nivelesData } = await supabase.from("niveles").select("*");
      const { data: personajesData } = await supabase.from("personajes").select("*");
      const { data: statsData } = await supabase.from("personaje_stats").select("*");

      setArenas(arenasData);
      setNiveles(nivelesData);
      setPersonajes(personajesData);
      setStats(statsData);

      setLoading(false);
    }

    loadData();
  }, []);

  if (loading) return <p>Cargando datos...</p>;

  return (
    <div className="homepage">
      <h1>Cartas</h1>
  
      {/* Buscador + Filtro Elixir */}
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
        
      {/* Cartas filtradas */}
      <div className="cards-container">
        {personajes
          .filter((p) =>
            p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .filter((p) =>
            elixirFilter === "" ? true : p.coste_elixir === Number(elixirFilter)
          )
          .map((p) => (
            <CardPersonaje
              key={p.id}
              nombre={p.nombre}
              imagen_url={p.imagen_url}
              rareza={p.rareza}
              coste_elixir={p.coste_elixir}
            />
          ))}
      </div>
    </div>
  );
}
