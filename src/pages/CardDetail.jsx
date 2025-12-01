import { useParams } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import "./CardDetail.css";

export default function CardDetail() {
  const { id } = useParams(); // Obtenemos el id de la carta desde la URL
  const { personajes, stats, loading } = useContext(DataContext); // DataContext

  // Mientras cargan los datos
  if (loading) return <p>Cargando datos...</p>;

  // Buscar el personaje por id
  const personaje = personajes.find(p => p.id === Number(id));

  // Filtrar solo los stats de este personaje
  const personajeStats = stats.filter(s => s.id_personaje === Number(id));

  // Por si alguien pone un enlace con un id que no existe
  if (!personaje) return <p className="no-data">No hay datos del personaje.</p>;

  return (
    <div className="detail-container">
      <div className="card-panel">
        {/* Imagen del personaje */}
        <img
          className="character-image"
          src={personaje.imagen_url}
          alt={personaje.nombre}
        />

        <h1 className="title">{personaje.nombre}</h1>

        {/* Info básica */}
        <p className="info"><strong>Rareza:</strong> {personaje.rareza}</p>
        <p className="info"><strong>Coste Elixir:</strong> {personaje.coste_elixir}</p>

        <h2 className="stats-title">Stats</h2>

        {personajeStats.length > 0 ? (
          <div className="stats-list">
            {personajeStats.map((s) => (
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
          <p className="no-data">No hay stats disponibles</p>
        )}
      </div>
    </div>
  );
}
