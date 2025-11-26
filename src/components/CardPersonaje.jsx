export default function CardPersonaje({ nombre, imagen_url, rareza, coste_elixir }) {
  return (
    // CAMBIO CLAVE: Usamos className="card" y eliminamos el atributo style
    <div className="card"> 
      
      <img 
        src={imagen_url} 
        alt={nombre} 
        // Eliminamos el style en línea de la imagen
      />
      
      {/* Usamos h2 en lugar de h3 para que coincida con el CSS de compactación que definimos */}
      <h2>{nombre}</h2> 
      
      {/* Añadimos clases a la información para poder controlarlas mejor */}
      <p className="card-rareza">Rareza: {rareza}</p>
      <p className="card-elixir">Elixir: {coste_elixir}</p>
      
    </div>
  );
}