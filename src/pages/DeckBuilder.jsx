import React, { useState, useEffect } from "react";
import "./DeckBuilder.css";

/*
  Ejemplo de datos de carta. Reemplaza image_url por tus imágenes reales si las tienes.
  - id: identificador único
  - nombre: nombre mostrado
  - elixir: coste de la carta
  - image_url: url de la imagen (opcional). Si no se provee, se genera una "ficha" con iniciales.
*/
const sampleCards = [
  { id: 1, nombre: "Gigante", elixir: 5, image_url: "" },
  { id: 2, nombre: "Mosquetera", elixir: 4, image_url: "" },
  { id: 3, nombre: "Montapuercos", elixir: 4, image_url: "" },
  { id: 4, nombre: "Mini P.E.K.K.A.", elixir: 4, image_url: "" },
  { id: 5, nombre: "Bebé Dragón", elixir: 4, image_url: "" },
  { id: 6, nombre: "Bruja", elixir: 5, image_url: "" },
  { id: 7, nombre: "Esqueleto", elixir: 1, image_url: "" },
  { id: 8, nombre: "Tornado", elixir: 3, image_url: "" },
  { id: 9, nombre: "Cañón", elixir: 3, image_url: "" },
  { id: 10, nombre: "Pandilla de duendes", elixir: 3, image_url: "" },
  // añade más cartas aquí...
];

const STORAGE_KEY = "deck_builder_saved_deck_v1";

function CardThumb({ card }) {
  // Muestra imagen si existe image_url, si no, una ficha con iniciales
  if (!card) return null;
  return card.image_url ? (
    <img src={card.image_url} alt={card.nombre} className="thumb-img" />
  ) : (
    <div className="thumb-fallback">
      <span>{getInitials(card.nombre)}</span>
    </div>
  );
}

function getInitials(name = "") {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function DeckBuilder({ cards = sampleCards }) {
  // deck: array de 8 elementos, cada uno null o una carta
  const [deck, setDeck] = useState(Array(8).fill(null));
  const [openSlot, setOpenSlot] = useState(null); // índice del slot que está seleccionando
  const [filter, setFilter] = useState("");
  const [availableCards] = useState(cards);

  useEffect(() => {
    // Cargar deck guardado si existe
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length === 8) setDeck(parsed);
      } catch (e) {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    // Guardar automáticamente
    localStorage.setItem(STORAGE_KEY, JSON.stringify(deck));
  }, [deck]);

  function openPicker(index) {
    setOpenSlot(index);
    setFilter("");
  }

  function closePicker() {
    setOpenSlot(null);
  }

  function chooseCard(card) {
    const newDeck = deck.slice();
    newDeck[openSlot] = card;
    setDeck(newDeck);
    closePicker();
  }

  function removeCard(index) {
    const newDeck = deck.slice();
    newDeck[index] = null;
    setDeck(newDeck);
  }

  function clearDeck() {
    setDeck(Array(8).fill(null));
    localStorage.removeItem(STORAGE_KEY);
  }

  function averageElixir() {
    const used = deck.filter(Boolean);
    if (used.length === 0) return 0;
    const sum = used.reduce((acc, c) => acc + (c.elixir || 0), 0);
    return (sum / used.length).toFixed(2);
  }

  const filtered = availableCards.filter((c) =>
    c.nombre.toLowerCase().includes(filter.trim().toLowerCase())
  );

  return (
    <div className="deck-page">
      <div className="deck-panel">
        <header className="deck-header">
          <h1>Creador de mazos</h1>
          <div className="deck-meta">
            <div className="elixir-bubble">
              <strong>{averageElixir()}</strong>
              <span>Avg Elixir</span>
            </div>
            <div className="deck-actions">
              <button className="btn btn-clear" onClick={clearDeck}>
                Limpiar
              </button>
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

        <section className="slots-grid" aria-label="Slots del mazo">
          {deck.map((card, i) => (
            <div className="slot-wrap" key={i}>
              <button
                className={`slot ${card ? "filled" : "empty"}`}
                onClick={() => openPicker(i)}
                aria-label={card ? `Slot ${i + 1}: ${card.nombre}` : `Slot ${i + 1}: vacío`}
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

              {card && (
                <button className="remove-btn" onClick={() => removeCard(i)} aria-label="Quitar carta">
                  ✕
                </button>
              )}

              <div className="slot-index">#{i + 1}</div>
            </div>
          ))}
        </section>
      </div>

      {/* Picker modal / panel */}
      {openSlot !== null && (
        <div className="picker-overlay" onMouseDown={closePicker}>
          <div className="picker-panel" onMouseDown={(e) => e.stopPropagation()}>
            <div className="picker-header">
              <h2>Selecciona una carta</h2>
              <button className="btn btn-close" onClick={closePicker}>
                Cerrar
              </button>
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

            <div className="cards-list" role="list">
              {filtered.length === 0 ? (
                <div className="no-results">No hay cartas que coincidan</div>
              ) : (
                filtered.map((c) => (
                  <button key={c.id} className="card-row" onClick={() => chooseCard(c)} role="listitem">
                    <div className="card-thumb-small">
                      {c.image_url ? <img src={c.image_url} alt={c.nombre} /> : <div>{getInitials(c.nombre)}</div>}
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
