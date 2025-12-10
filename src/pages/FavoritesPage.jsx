import { Link, useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import CardPersonaje from "../components/CardPersonaje";
import "./HomePage.css"; 

// --- 1. IMPORTAMOS LA IMAGEN ---
import imgEspadaFlecha from '../assets/espada-flecha.png';

export default function FavoritesPage() {
    const { favorites, toggleFavorite } = useFavorites();
    const navigate = useNavigate();

    return (
        <div className="homepage" style={{ position: "relative", minHeight: "80vh" }}>
            
            {/* --- 2. CAMBIAMOS LA FLECHA POR LA IMAGEN --- */}
            <button className="btn-volver-atras" onClick={() => navigate("/")}>
                <img src={imgEspadaFlecha} alt="Volver" className="icono-volver" />
            </button>

            <h1 className="favorites-title">
                Favoritos
            </h1>

            {favorites.length === 0 ? (
                <div style={{ textAlign: "center", marginTop: "100px", color: "white" }}>
                    <p style={{ fontSize: "1.5rem", fontWeight: "bold", opacity: 0.8 }}>
                        No tienes cartas favoritas
                    </p>
                    <p style={{ fontSize: "4rem", marginTop: "20px" }}>💔</p>
                </div>
            ) : (
                <div className="cards-container" style={{ marginTop: "20px" }}>
                    {favorites.map(p => (
                        <div key={p.id} className="card-wrapper">
                            <Link
                                to={`/personaje/${p.id}`}
                                style={{ textDecoration: "none" }}
                            >
                                <CardPersonaje {...p} />
                            </Link>

                            <button
                                className="remove-fav-btn"
                                onClick={() => toggleFavorite(p)}  
                            >
                                ★
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}