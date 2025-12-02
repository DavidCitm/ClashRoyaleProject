import { useState, useEffect } from "react";
import { fetchTable } from "../pages/supabase";
import "./DeckBuilder.css";

const STORAGE_KEY = "deck_builder_saved_deck_v1";

// Mini componente para mostrar miniatura de una carta
function CardThumb({ card }) {
  if (!card) return null;
  return <img src={card.image_url} alt={card.nombre} className="thumb-img" />;
}

export default function DeckBuilder() {
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [deck, setDeck] = useState(Array(8).fill(null)); // 8 slots
  const [openSlot, setOpenSlot] = useState(null); // Slot que está abriendo el selector
  const [filter, setFilter] = useState("");

  // ────────────────────────────────────────────
  // Cargar personajes desde Supabase
  // ────────────────────────────────────────────
  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchTable("personajes");
      setPersonajes(data);
      setLoading(false);
    }
    load();
  }, []);

  // ────────────────────────────────────────────
  // Cargar el mazo desde localStorage
  // ────────────────────────────────────────────
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length === 8) setDeck(parsed);
      } catch (e) {}
    }
  }, []);

  // Guardar en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(deck));
  }, [deck]);

  // ────────────────────────────────────────────
  // Si los datos están cargando
  // ────────────────────────────────────────────
  if (loading) return <p>Cargando cartas...</p>;

  // Transformar personajes al formato usado por el constructor
  const cards = personajes.map((p) => ({
    id: p.id,
    nombre: p.nombre,
    elixir: p.coste_elixir,
    image_url: p.imagen_url,
  }));

  // Aplicar filtro de búsqueda
  const filtered = cards.filter((c) =>
    c.nombre.toLowerCase().includes(filter.toLowerCase())
  );

  // ────────────────────────────────────────────
  // Acciones del deck
  // ────────────────────────────────────────────
  const openPicker = (index) => {
    setOpenSlot(index);
    setFilter("");
  };

  const closePicker = () => setOpenSlot(null);

  const chooseCard = (card) => {
    const newDeck = [...deck];
    newDeck[openSlot] = card;
    setDeck(newDeck);
    closePicker();
  };

  const removeCard = (index) => {
    const newDeck = [...deck];
    newDeck[index] = null;
    setDeck(newDeck);
  };

  const clearDeck = () => {
    setDeck(Array(8).fill(null));
    localStorage.removeItem(STORAGE_KEY);
  };

  const averageElixir = () => {
    const used = deck.filter(Boolean);
    if (used.length === 0) return 0;
    const sum = used.reduce((acc, c) => acc + (c.elixir || 0), 0);
    return (sum / used.length).toFixed(2);
  };

  // ────────────────────────────────────────────
  // Render
  // ────────────────────────────────────────────
  return (
    <div className="deck-page">
      <div className="deck-panel">
        {/* Header */}
        <header className="deck-header">
          <h1>Creador de mazos</h1>

          <div className="deck-meta">
            <div className="elixir-bubble">
              <strong>{averageElixir()}</strong>
              <span>Avg Elixir</span>
            </div>

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

        {/* Grid de 8 slots */}
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

              {/* Botón de eliminar carta */}
              {card && (
                <button className="remove-btn" onClick={() => removeCard(i)}>
                  ✕
                </button>
              )}

              <div className="slot-index">#{i + 1}</div>
            </div>
          ))}
        </section>
      </div>

      {/* Selector de cartas (modal) */}
      {openSlot !== null && (
        <div className="picker-overlay" onMouseDown={closePicker}>
          <div className="picker-panel" onMouseDown={(e) => e.stopPropagation()}>
            <div className="picker-header">
              <h2>Selecciona una carta</h2>
              <button className="btn btn-close" onClick={closePicker}>Cerrar</button>
            </div>

            <div className="picker-controls">
              <input
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
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
                filtered.map((c) => (
                  <button
                    key={c.id}
                    className="card-row"
                    onClick={() => chooseCard(c)}
                  >
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
