import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import "./Arenas.css";

export default function Arenas() {
  // Obtenemos las arenas y el estado de carga del DataContext
  const { arenas, loading } = useContext(DataContext);

  // Mientras los datos se cargan
  if (loading) return <p>Cargando arenas...</p>;

  // Si algo falla deberia salir esto, esperemos que no
  if (!arenas || arenas.length === 0) return <p>No hay arenas disponibles.</p>;

  return (
    <div className="arenas-container">
      <h1 className="arenas-title">Arenas</h1>

      {/* Listado de cartas */}
      <div className="arenas-list">
        {arenas.map((arena) => (
          <div key={arena.id} className="arena-card">
            {/* Nombre de la arena */}
            <div className="arena-header">
              <h2 className="arena-name">{arena.nombre}</h2>
            </div>

            {/* Rango de copas de la arena */}
            <p className="arena-copas">
              🏆 {arena.copas_min} - {arena.copas_max} copas
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

