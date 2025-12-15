import { useEffect, useState } from "react";
import { fetchTable, SUPABASE_PROJECT_URL } from "../pages/supabase";
import "./Arenas.css";

export default function Arenas() {
  // ===== ESTADO ===== 
  const [arenas, setArenas] = useState([]);   // Lista de arenas
  const [loading, setLoading] = useState(true); // Estado de carga


  // ===== CARGA DE DATOS ===== 
  useEffect(() => {
    async function load() {
      setLoading(true);

      // Obtenemos las arenas
      const data = await fetchTable("arenas");

      // Ordenarlas por id
      data.sort((a, b) => a.id - b.id);

      setArenas(data);
      setLoading(false);
    }

    load();
  }, []);

  
  // ===== HELPERS =====

  // Construye la URL pública de la imagen almacenada en Supabase
  function getArenaImage(imgName) {
    if (!imgName) return "";
    return `${SUPABASE_PROJECT_URL}/storage/v1/object/publicarenas/${imgName}`;
  }

  
  // Loading
  if (loading) return <p>Cargando arenas...</p>;

  // Por si no hay arenas
  if (arenas.length === 0) return <p>No hay arenas disponibles.</p>;


  // ===== RENDER ===== 
  return (
    <div className="arenas-container">
      <h1 className="arenas-title">Arenas</h1>

      <div className="arenas-list">
        {arenas.map((arena) => (
          <div key={arena.id} className="arena-card">
            <div className="arena-content">

              {/* Información de la arena */}
              <div className="arena-text">
                <h2 className="arena-name">{arena.nombre}</h2>
                <p className="arena-copas">
                  🏆 {arena.copas_min} - {arena.copas_max} copas
                </p>
              </div>

              {/* Imagen de la arena */}
              <img
                src={getArenaImage(arena.img_url)}
                alt={arena.nombre}
                className="arena-img"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
