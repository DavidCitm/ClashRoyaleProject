import "./Arenas.css";

const arenasData = [
  { id: 1, nombre: "Estadio Duende", copas_min: 0, copas_max: 300 },
  { id: 2, nombre: "Foso de Huesos", copas_min: 300, copas_max: 600 },
  { id: 3, nombre: "Coliseo Bárbaro", copas_min: 600, copas_max: 1000 },
  { id: 4, nombre: "Taller de Constructores", copas_min: 1000, copas_max: 1300 },
  { id: 5, nombre: "Valle de Hechizos", copas_min: 1300, copas_max: 1600 },
  { id: 6, nombre: "Pico Helado", copas_min: 1600, copas_max: 2000 },
  { id: 7, nombre: "Real Arena", copas_min: 2000, copas_max: 2300 },
  { id: 8, nombre: "Arena Selvática", copas_min: 2300, copas_max: 2600 },
  // Puedes añadir más…
];

export default function Arenas() {
  return (
    <div className="arenas-container">
      <h1 className="arenas-title">Arenas</h1>

      <div className="arenas-list">
        {arenasData.map((arena) => (
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
