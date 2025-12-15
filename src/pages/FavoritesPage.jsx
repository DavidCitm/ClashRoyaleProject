import { Link, useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import CardPersonaje from "../components/CardPersonaje";
import "./FavoritesPage.css"; // CSS separado

// Imagen de la flecha
import imgEspadaFlecha from '../assets/espada-flecha.png';

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  return (
    <div className="favorites-page">
      {/* Botón volver */}
      <button className="btn-volver-atras" onClick={() => navigate("/")}>
        <img src={imgEspadaFlecha} alt="Volver" className="icono-volver" />
      </button>

      <h1 className="favorites-title">Favoritos</h1>

      {favorites.length === 0 ? (
        <div className="no-favorites">
          <p>No tienes cartas favoritas</p>
          <p>💔</p>
        </div>
      ) : (
        <div className="cards-container">
          {favorites.map((p) => (
            <div key={p.id} className="card-wrapper">
              <Link to={`/personaje/${p.id}`} style={{ textDecoration: "none" }}>
                <CardPersonaje {...p} />
              </Link>
              <button className="remove-fav-btn" onClick={() => toggleFavorite(p)}>
                ★
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
