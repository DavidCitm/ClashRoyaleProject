export default function CardPersonaje({ nombre, imagen_url, rareza, coste_elixir }) {
  return (
    <div className="card"> 
      <img src={imagen_url} alt={nombre} />
      <h2>{nombre}</h2>
      <p className="card-rareza">Rareza: {rareza}</p>
      <p className="card-elixir">Elixir: {coste_elixir}</p>
    </div>
  );
}
