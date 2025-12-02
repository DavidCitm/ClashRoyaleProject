import { useEffect, useState } from "react";
import { fetchTable } from "../pages/supabase";
import "./Arenas.css";

export default function Arenas() {
  const [arenas, setArenas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchTable("arenas");
      setArenas(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <p>Cargando arenas...</p>;
  if (arenas.length === 0) return <p>No hay arenas disponibles.</p>;

  return (
    <div className="arenas-container">
      <h1 className="arenas-title">Arenas</h1>

      <div className="arenas-list">
        {arenas.map(arena => (
          <div key={arena.id} className="arena-card">
            <div className="arena-header">
              <h2 className="arena-name">{arena.nombre}</h2>
            </div>

            <p className="arena-copas">
              🏆 {arena.copas_min} - {arena.copas_max} copas
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
