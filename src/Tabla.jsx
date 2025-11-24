return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>📊 Base de datos Clash Royale</h1>

      {/* ARENAS */}
      <h2>🏟️ Arenas</h2>
      <table border="1" cellPadding="8">
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

      {/* NIVELES */}
      <h2>📈 Niveles</h2>
      <table border="1" cellPadding="8">
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

      {/* PERSONAJES */}
      <h2>🧙 Personajes</h2>
      <table border="1" cellPadding="8">
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

      {/* PERSONAJE STATS */}
      <h2>⚔️ Stats de Personajes</h2>
      <table border="1" cellPadding="8">
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
    </div>
  );