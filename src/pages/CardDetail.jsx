import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchById } from "../pages/supabase";
import "./CardDetail.css";
import { useFavorites } from '../context/FavoritesContext';

// --- 1. IMPORTAMOS LA NUEVA IMAGEN ---
import imgEspadaFlecha from '../assets/espada-flecha.png';

export default function CardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [personaje, setPersonaje] = useState(null);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const [pData, sData] = await Promise.all([
        fetchById("personajes", "id", id),
        fetchById("personaje_stats", "id_personaje", id)
      ]);

      setPersonaje(pData[0]);
      setStats(sData);

      setLoading(false);
    }

    load();
  }, [id]);

  const { toggleFavorite, isFavorite } = useFavorites();

  if (loading) return <p>Cargando datos...</p>;
  if (!personaje) return <p>No hay datos del personaje.</p>;

  const favorito = isFavorite(personaje.id);

  return (
    <div className="detail-container">
      <div className="card-panel">
        
        {/* --- 2. CAMBIAMOS LA FLECHA POR LA IMAGEN --- */}
        <button className="btn-volver-atras" onClick={() => navigate("/")}>
          <img src={imgEspadaFlecha} alt="Volver" className="icono-volver" />
        </button>

        {/* BOTÓN FAVORITOS CIRCULAR (DERECHA) */}
        <button 
            onClick={() => toggleFavorite(personaje)}
            className="favorite-circular-btn" 
            style={{ backgroundColor: favorito ? 'gold' : 'rgba(0,0,0,0.25)' }} 
        >
            {favorito ? '★' : '☆'}
        </button>

        <img
          className="character-image"
          src={personaje.imagen_url}
          alt={personaje.nombre}
        />

        <h1 className="title">{personaje.nombre}</h1>

        <p className="info"><strong>Rareza:</strong> {personaje.rareza}</p>
        <p className="info"><strong>Coste Elixir:</strong> {personaje.coste_elixir}</p>

        <h2 className="stats-title">Stats</h2>

        {stats.length > 0 ? (
          <div className="stats-list">
            {stats.map((s) => (
              <div className="stat-card" key={s.nivel}>
                <h3>Nivel {s.nivel}</h3>
                <p>❤️ Vida: <strong>{s.vida}</strong></p>
                <p>⚔️ Daño: <strong>{s.dano}</strong></p>
                <p>⏱️ Vel. Ataque: <strong>{s.velocidad_ataque}</strong></p>
                <p>🏃 Vel. Movimiento: <strong>{s.velocidad_movimiento}</strong></p>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay stats disponibles</p>
        )}
      </div>
    </div>
  );
}