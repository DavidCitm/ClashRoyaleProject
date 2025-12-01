import { useLocation } from "react-router-dom";
import "./CardDetail.css";

export default function CardDetail() {
  const location = useLocation();
  const { personaje, stats } = location.state || {};

  if (!personaje) return <p className="no-data">No hay datos del personaje. Vuelve desde la lista.</p>;

  return (
    <div className="detail-container">
      <div className="card-panel">
        <img className="character-image" src={personaje.imagen_url} alt={personaje.nombre} />

        <h1 className="title">{personaje.nombre}</h1>

        <p className="info"><strong>Rareza:</strong> {personaje.rareza}</p>
        <p className="info"><strong>Coste Elixir:</strong> {personaje.coste_elixir}</p>

        <h2 className="stats-title">Stats</h2>

        {stats && stats.length > 0 ? (
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
          <p className="no-data">No hay stats disponibles</p>
        )}
      </div>
    </div>
  );
}
