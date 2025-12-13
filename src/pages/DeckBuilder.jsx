import { useState, useEffect } from "react";
import { fetchTable } from "../pages/supabase";
import "./DeckBuilder.css";

const STORAGE_KEY = "deck_builder_v2";

export default function DeckBuilder() {
  const [cards, setCards] = useState([]);
  const [deck, setDeck] = useState(Array(8).fill(null));
  const [pickerOpen, setPickerOpen] = useState(false);
  const [activeSlot, setActiveSlot] = useState(null);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  /* LOAD CARDS */
  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchTable("personajes");
      setCards(data);
      setLoading(false);
    }
    load();
  }, []);

  /* LOAD SAVED DECK */
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length === 8) setDeck(parsed);
    }
  }, []);

  /* SAVE */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(deck));
  }, [deck]);

  if (loading) return <p>Cargando cartas...</p>;

  const avgElixir = () => {
    const used = deck.filter(Boolean);
    if (!used.length) return "0.0";
    const sum = used.reduce((a, c) => a + c.coste_elixir, 0);
    return (sum / used.length).toFixed(2);
  };

  const openPicker = (slot) => {
    setActiveSlot(slot);
    setPickerOpen(true);
    setFilter("");
  };

  const chooseCard = (card) => {
    const newDeck = [...deck];
    newDeck[activeSlot] = card;
    setDeck(newDeck);
    setPickerOpen(false);
  };

  const removeCard = (slot) => {
    const newDeck = [...deck];
    newDeck[slot] = null;
    setDeck(newDeck);
  };

  return (
    <div className="deckbuilder-page">
      <div className="deckbuilder-panel">

        {/* HEADER */}
        <div className="deckbuilder-header">
          <h1>Creador de Mazos</h1>

          <div className="deckbuilder-meta">
            <div className="elixir-pill">
              <strong>{avgElixir()}</strong>
              <span>Avg Elixir</span>
            </div>

            <button className="btn secondary" onClick={() => setDeck(Array(8).fill(null))}>
              Limpiar
            </button>
          </div>
        </div>

        {/* DECK */}
        <div className="deck-grid">
          {deck.map((card, i) => (
            <div key={i} className="deck-slot">
              <button
                className={`slot-btn ${card ? "filled" : ""}`}
                onClick={() => openPicker(i)}
              >
                {card ? (
                  <>
                    <img src={card.imagen_url} alt={card.nombre} />
                    <span className="elixir">{card.coste_elixir}</span>
                  </>
                ) : (
                  <span className="plus">+</span>
                )}
              </button>

              {card && (
                <button className="remove" onClick={() => removeCard(i)}>✕</button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* PICKER */}
      {pickerOpen && (
        <div className="picker-overlay" onClick={() => setPickerOpen(false)}>
          <div className="picker-panel" onClick={e => e.stopPropagation()}>
            <input
              className="picker-search"
              placeholder="Buscar carta..."
              value={filter}
              onChange={e => setFilter(e.target.value)}
              autoFocus
            />

            <div className="picker-grid">
              {cards
                .filter(c => c.nombre.toLowerCase().includes(filter.toLowerCase()))
                .map(card => (
                  <button
                    key={card.id}
                    className="picker-card"
                    onClick={() => chooseCard(card)}
                  >
                    <img src={card.imagen_url} alt={card.nombre} />
                    <span>{card.nombre}</span>
                    <em>{card.coste_elixir}</em>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
