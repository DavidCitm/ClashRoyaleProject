import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import './Body.css';

export default function Body() {
  const [arenas, setArenas] = useState([]);
  const [niveles, setNiveles] = useState([]);
  const [personajes, setPersonajes] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      const { data: arenasData } = await supabase.from("arenas").select("*");
      const { data: nivelesData } = await supabase.from("niveles").select("*");
      const { data: personajesData } = await supabase.from("personajes").select("*");
      const { data: statsData } = await supabase.from("personaje_stats").select("*");

      setArenas(arenasData || []);
      setNiveles(nivelesData || []);
      setPersonajes(personajesData || []);
      setStats(statsData || []);
      setLoading(false);
    }

    loadData();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Cargando datos...</p>;

  return (
    <div className="body-container">
      <h1>📊 Base de datos Clash Royale</h1>

      {/* ARENAS */}
      <h2>🏟️ Arenas</h2>
      {arenas.length === 0 ? <p>No hay datos</p> : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Copas mín</th>
              <th>Copas máx</th>
            </tr>
          </thead>
          <tbody>
            {arenas.map(a => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.nombre}</td>
                <td>{a.copas_min}</td>
                <td>{a.copas_max}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* NIVELES */}
      <h2>📈 Niveles</h2>
      {niveles.length === 0 ? <p>No hay datos</p> : (
        <table>
          <thead>
            <tr>
              <th>Rareza</th>
              <th>Nivel máximo</th>
              <th>Coste elixir promedio</th>
            </tr>
          </thead>
          <tbody>
            {niveles.map((n, i) => (
              <tr key={i}>
                <td>{n.rareza}</td>
                <td>{n.nivel_maximo}</td>
                <td>{n.coste_elixir_promedio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* PERSONAJES */}
      <h2>🧙 Personajes</h2>
      {personajes.length === 0 ? <p>No hay datos</p> : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Rareza</th>
              <th>Coste Elixir</th>
              <th>Arena</th>
            </tr>
          </thead>
          <tbody>
            {personajes.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{p.rareza}</td>
                <td>{p.coste_elixir}</td>
                <td>{p.id_arena}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* PERSONAJE STATS */}
      <h2>⚔️ Stats de Personajes</h2>
      {stats.length === 0 ? <p>No hay datos</p> : (
        <table>
          <thead>
            <tr>
              <th>ID Stats</th>
              <th>ID Personaje</th>
              <th>Nivel</th>
              <th>Vida</th>
              <th>Daño</th>
              <th>Vel. Ataque</th>
              <th>Vel. Movimiento</th>
            </tr>
          </thead>
          <tbody>
            {stats.map(s => (
              <tr key={s.id_stats}>
                <td>{s.id_stats}</td>
                <td>{s.id_personaje}</td>
                <td>{s.nivel}</td>
                <td>{s.vida}</td>
                <td>{s.dano}</td>
                <td>{s.velocidad_ataque}</td>
                <td>{s.velocidad_movimiento}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
