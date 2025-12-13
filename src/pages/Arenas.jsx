import { useEffect, useState } from "react";
import { fetchTable, SUPABASE_PROJECT_URL } from "../pages/supabase";
import "./Arenas.css";

export default function Arenas() {
  const [arenas, setArenas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchTable("arenas");

      // Orden como en la tabla
      data.sort((a, b) => a.id - b.id);

      setArenas(data);
      setLoading(false);
    }
    load();
  }, []);

  // Construir URL pública de la imagen
  function getArenaImage(imgName) {
    if (!imgName) return "";
    return `${SUPABASE_PROJECT_URL}/storage/v1/object/publicarenas/${imgName}`;
  }

  if (loading) return <p>Cargando arenas...</p>;
  if (arenas.length === 0) return <p>No hay arenas disponibles.</p>;

  return (
    <div className="arenas-container">
      <h1 className="arenas-title"></h1>

      <div className="arenas-list">
        {arenas.map(arena => (
          <div key={arena.id} className="arena-card">
            <div className="arena-content">
              <div className="arena-text">
                <h2 className="arena-name">{arena.nombre}</h2>
                <p className="arena-copas">
                  🏆 {arena.copas_min} - {arena.copas_max} copas
                </p>
              </div>

              <img
                src={getArenaImage(arena.img_url)}
                alt={arena.nombre}
                className="arena-img"
                onError={(e) => e.target.style.display = "none"}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
