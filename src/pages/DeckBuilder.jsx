import { useState, useEffect, useContext } from "react";
import { DataContext } from "../context/DataContext";
import "./DeckBuilder.css";

const STORAGE_KEY = "deck_builder_saved_deck_v1";

// Para mostrar la imagen de la carta
function CardThumb({ card }) {
  if (!card) return null;
  return <img src={card.image_url} alt={card.nombre} className="thumb-img" />;
}

export default function DeckBuilder() {
  const { personajes, loading } = useContext(DataContext); // DatosContext
  const [deck, setDeck] = useState(Array(8).fill(null)); // El mazo actual (8 slots)
  const [openSlot, setOpenSlot] = useState(null); // Slot abierto para seleccionar carta
  const [filter, setFilter] = useState(""); // Filtro de busqueda

  // Cargar deck guardado en localStorage al montar
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length === 8) setDeck(parsed);
      } catch (e) {}
    }
  }, []);

  // Guardar automáticamente deck en localStorage al cambiar
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(deck));
  }, [deck]);

  if (loading) return <p>Cargando cartas...</p>;

  // Transformar personajes a formato de carta usado en DeckBuilder
  const cards = personajes.map(p => ({
    id: p.id,
    nombre: p.nombre,
    elixir: p.coste_elixir,
    image_url: p.imagen_url,
  }));

  // Aplicar filtro de búsqueda
  const filtered = cards.filter(c =>
    c.nombre.toLowerCase().includes(filter.trim().toLowerCase())
  );

  // Abrir panel de selección de carta
  const openPicker = index => {
    setOpenSlot(index);
    setFilter(""); // reset filtro al abrir
  };

  // Cerrar panel
  const closePicker = () => setOpenSlot(null);

  // Elegir carta para un slot
  const chooseCard = card => {
    const newDeck = deck.slice();
    newDeck[openSlot] = card;
    setDeck(newDeck);
    closePicker();
  };

  // Quitar carta de un slot
  const removeCard = index => {
    const newDeck = deck.slice();
    newDeck[index] = null;
    setDeck(newDeck);
  };

  // Limpiar todo el deck
  const clearDeck = () => {
    setDeck(Array(8).fill(null));
    localStorage.removeItem(STORAGE_KEY);
  };

  // Calcular elixir promedio del deck
  const averageElixir = () => {
    const used = deck.filter(Boolean);
    if (used.length === 0) return 0;
    const sum = used.reduce((acc, c) => acc + (c.elixir || 0), 0);
    return (sum / used.length).toFixed(2);
  };

  return (
    <div className="deck-page">
      <div className="deck-panel">
        {/* Header con título y meta información */}
        <header className="deck-header">
          <h1>Creador de mazos</h1>
          <div className="deck-meta">
            {/* Burbuja de elixir promedio */}
            <div className="elixir-bubble">
              <strong>{averageElixir()}</strong>
              <span>Avg Elixir</span>
            </div>
            {/* Botones limpiar/guardar */}
            <div className="deck-actions">
              <button className="btn btn-clear" onClick={clearDeck}>Limpiar</button>
              <button
                className="btn btn-save"
                onClick={() => {
                  localStorage.setItem(STORAGE_KEY, JSON.stringify(deck));
                  alert("Mazo guardado localmente");
                }}
              >
                Guardar
              </button>
            </div>
          </div>
        </header>

        {/* Grid de slots del deck */}
        <section className="slots-grid">
          {deck.map((card, i) => (
            <div className="slot-wrap" key={i}>
              <button
                className={`slot ${card ? "filled" : "empty"}`}
                onClick={() => openPicker(i)}
              >
                {card ? (
                  <>
                    <div className="slot-thumb">
                      <CardThumb card={card} />
                    </div>
                    <div className="slot-meta">
                      <div className="slot-name">{card.nombre}</div>
                      <div className="slot-elixir">{card.elixir}</div>
                    </div>
                  </>
                ) : (
                  <div className="slot-placeholder">+</div>
                )}
              </button>

              {/* Botón quitar carta */}
              {card && (
                <button className="remove-btn" onClick={() => removeCard(i)}>✕</button>
              )}

              <div className="slot-index">#{i + 1}</div>
            </div>
          ))}
        </section>
      </div>

      {/* Picker modal para seleccionar carta */}
      {openSlot !== null && (
        <div className="picker-overlay" onMouseDown={closePicker}>
          <div className="picker-panel" onMouseDown={e => e.stopPropagation()}>
            <div className="picker-header">
              <h2>Selecciona una carta</h2>
              <button className="btn btn-close" onClick={closePicker}>Cerrar</button>
            </div>

            {/* Controles de búsqueda y slot */}
            <div className="picker-controls">
              <input
                value={filter}
                onChange={e => setFilter(e.target.value)}
                placeholder="Filtrar por nombre..."
                className="picker-search"
                autoFocus
              />
              <div className="picker-info">Slot: {openSlot + 1}</div>
            </div>

            {/* Lista de cartas filtradas */}
            <div className="cards-list">
              {filtered.length === 0 ? (
                <div className="no-results">No hay cartas que coincidan</div>
              ) : (
                filtered.map(c => (
                  <button key={c.id} className="card-row" onClick={() => chooseCard(c)}>
                    <div className="card-thumb-small">
                      <img src={c.image_url} alt={c.nombre} />
                    </div>
                    <div className="card-info">
                      <div className="card-name">{c.nombre}</div>
                      <div className="card-elixir">Elixir {c.elixir}</div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
