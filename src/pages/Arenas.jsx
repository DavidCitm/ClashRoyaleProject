import { useEffect, useState } from "react";
import { fetchTable, SUPABASE_PROJECT_URL } from "../pages/supabase";
import "./Arenas.css";

export default function Arenas() {
  const [arenas, setArenas] = useState([]);
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      // 1️⃣ Fetch arenas
      const arenasData = await fetchTable("arenas");

      // 2️⃣ Fetch personajes
      const personajesData = await fetchTable("personajes");

      // Ordenar arenas por id
      arenasData.sort((a, b) => a.id - b.id);

      setArenas(arenasData);
      setPersonajes(personajesData);
      setLoading(false);
    }

    load();
  }, []);

  function getArenaImage(imgName) {
    if (!imgName) return "";
    return `${SUPABASE_PROJECT_URL}/storage/v1/object/publicarenas/${imgName}`;
  }

  // Cartas desbloqueadas por arena
  function getCardsByArena(arenaId) {
    return personajes.filter(
      (card) => card.id_arena === arenaId
    );
  }

  if (loading) return <p>Cargando arenas...</p>;

  return (
    <div className="arenas-container">
      <div className="arenas-content">
        <h1 className="arenas-title">Arenas</h1>

        <div className="arenas-list">
          {arenas.map((arena) => {
            const cartas = getCardsByArena(arena.id);

            return (
              <div key={arena.id} className="arena-card">
                <div className="arena-content">

                  {/* IZQUIERDA → TEXTO */}
                  <div className="arena-text">
                    <h2 className="arena-name">{arena.nombre}</h2>
                    <p className="arena-copas">
                      🏆 {arena.copas_min} - {arena.copas_max} copas
                    </p>
                  </div>

                  {/* CENTRO → CARTAS DESBLOQUEADAS */}
                  <div className="arena-unlocks">
                    {cartas.length > 0 ? (
                      cartas.map((card) => (
                        <img
                          key={card.id}
                          src={card.imagen_url}
                          alt={card.nombre}
                          title={card.nombre}
                          className="arena-unlock-card"
                          loading="lazy"
                        />
                      ))
                    ) : (
                      <span style={{ opacity: 0.6 }}>—</span>
                    )}
                  </div>

                  {/* DERECHA → IMAGEN ARENA */}
                  <img
                    src={getArenaImage(arena.img_url)}
                    alt={arena.nombre}
                    className="arena-img"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
