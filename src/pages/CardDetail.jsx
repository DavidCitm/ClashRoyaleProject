import { useLocation } from "react-router-dom";

export default function CardDetail() {
  const location = useLocation();
  const { personaje, stats } = location.state || {};

  if (!personaje) return <p>No hay datos del personaje. Vuelve desde la lista.</p>;

  return (
    <div>
      <h1>{personaje.nombre}</h1>
      <img src={personaje.imagen_url} alt={personaje.nombre} />
      <p>Rareza: {personaje.rareza}</p>
      <p>Coste Elixir: {personaje.coste_elixir}</p>

      <h2>Stats</h2>
      {stats && stats.length > 0 ? (
        <ul>
          {stats.map((s) => (
            <li key={s.nivel}>
              Nivel {s.nivel}: 
              Vida: {s.vida}, 
              Daño: {s.dano}, 
              Velocidad ataque: {s.velocidad_ataque}, 
              Velocidad movimiento: {s.velocidad_movimiento}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay stats disponibles</p>
      )}
    </div>
  );
}