import { useState, useEffect } from "react";
import { fetchTable } from "../pages/supabase";
import { useDeck } from "../context/DecksContext";
import SavedDecks from "../components/SavedDecks";
import "./DeckBuilder.css";

export default function DeckBuilder() {
  // ===== ESTADOS =====
  const { deck, setDeck, saveCurrentDeck, clearDeck } = useDeck();
  const [cards, setCards] = useState([]);
  const [pickerOpen, setPickerOpen] = useState(false); // picker para elegir carta
  const [activeSlot, setActiveSlot] = useState(null); // slot activo del deck
  const [filter, setFilter] = useState(""); // filtro del picker
  const [loading, setLoading] = useState(true); // estado de carga
  const [deckName, setDeckName] = useState(""); // nombre del mazo


  // ===== CARGA DE DATOS =====
  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchTable("personajes");
      setCards(data);
      setLoading(false);
    }
    load();
  }, []);

  // Mientras carga muestra mensaje
  if (loading) return <p>Cargando cartas...</p>;


  // Para calcular el Avg Elixir del mazo actual
  const avgElixir = () => {
    const used = deck.filter(Boolean);
    if (!used.length) return "0.0";
    const sum = used.reduce((a, c) => a + c.coste_elixir, 0);
    return (sum / used.length).toFixed(2);
  };

  // Abrir picker en el slot seleccionado
  const openPicker = (slot) => {
    setActiveSlot(slot);
    setPickerOpen(true);
    setFilter(""); // limpiar filtro al abrir
  };

  // Elegir carta para un slot del deck
  const chooseCard = (card) => {
    const newDeck = [...deck];
    newDeck[activeSlot] = card;
    setDeck(newDeck);
    setPickerOpen(false);
  };

  // Eliminar carta de un slot
  const removeCard = (slot) => {
    const newDeck = [...deck];
    newDeck[slot] = null;
    setDeck(newDeck);
  };

  // Guardar el mazo actual con nombre
  const handleSave = () => {
    saveCurrentDeck(deckName);
    setDeckName(""); // limpiar input después de guardar
  };


  // ===== RENDER =====
  return (
    <div className="deckbuilder-page">
      <div className="deckbuilder-panel">

        {/* HEADER */}
        <div className="deckbuilder-header">
          <h1>Creador de Mazos</h1>
          <div className="deckbuilder-meta">
            {/* Avg Elixir */}
            <div className="elixir-pill">
              <strong>{avgElixir()}</strong>
              <span>Avg Elixir</span>
            </div>
            {/* Botón limpiar mazo */}
            <button className="btn secondary" onClick={clearDeck}>
              Limpiar
            </button>
          </div>
        </div>

        {/* Input para nombre del mazo y botón de guardar */}
        <div style={{ marginBottom: "12px", display: "flex", gap: "8px" }}>
          <input
            type="text"
            placeholder="Nombre del mazo"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            style={{ flex: 1, padding: "6px 10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
          <button className="btn primary" onClick={handleSave}>
            Guardar Mazo
          </button>
        </div>

        {/* GRID DEL MAZO ACTUAL */}
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

      {/* PICKER DE CARTAS */}
      {pickerOpen && (
        <div className="picker-overlay" onClick={() => setPickerOpen(false)}>
          <div className="picker-panel" onClick={(e) => e.stopPropagation()}>
            <input
              className="picker-search"
              placeholder="Buscar carta..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              autoFocus
            />
            <div className="picker-grid">
              {cards
                .filter((c) => c.nombre.toLowerCase().includes(filter.toLowerCase()))
                .map((card) => (
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

      {/* Componente que muestra los mazos guardados*/}
      <SavedDecks />
    </div>
  );
}
