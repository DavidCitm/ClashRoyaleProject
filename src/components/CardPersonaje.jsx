export default function CardPersonaje({ nombre, imagen_url, rareza, coste_elixir }) {
  return (
    <div
      style={{
        background: "#e7cbe9ff",
        borderRadius: "12px",
        padding: "10px",
        textAlign: "center",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
        border: "2px solid black"   // 👈 AÑADE ESTA LÍNEA
      }}
    >
      <img 
        src={imagen_url} 
        alt={nombre} 
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <h3>{nombre}</h3>
      <p>Rareza: {rareza}</p>
      <p>Elixir: {coste_elixir}</p>
    </div>
  );
}
