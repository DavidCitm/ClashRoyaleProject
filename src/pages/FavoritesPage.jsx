import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import CardPersonaje from "../components/CardPersonaje";
import "./HomePage.css"; // Usa el MISMO estilo que HomePage

export default function FavoritesPage() {
    // 1. Ens connectem al Context per llegir la llista
    const { favorites, toggleFavorite } = useFavorites();

    // 2. Cas buit: Si no hi ha res, avisem l'usuari
    if (favorites.length === 0) {
        return (
            <div className="homepage">
                <h1>Cartas Favoritas</h1>
                <p style={{ textAlign: "center" }}>No tienes cartas favoritas </p>
                <Link to="/" className="btn-back">← Volver</Link>
            </div>
        );
    }

    // 3. Cas amb dades: Pintem la llista
    return (
        <div className="homepage">
            <h1>Cartas Favoritas</h1>

            <div className="cards-container">
                {favorites.map(p => (
                    <div key={p.id} className="card-wrapper">
                        
                        {/* Carta clicable que lleva al detalle */}
                        <Link
                            to={`/personaje/${p.id}`}
                            state={{ personaje: p }}
                            style={{ textDecoration: "none" }}
                        >
                            <CardPersonaje {...p} />
                        </Link>

                        {/* Botón para quitar de favoritos */}
                        <button
                            className="remove-fav-btn"
                            onClick={() => toggleFavorite(p)}  
                        >
                            ★
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
