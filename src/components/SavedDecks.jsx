import { useDeck } from "../context/DecksContext";
import "./SavedDecks.css";

export default function SavedDecks() {
  const { savedDecks, loadDeck, deleteDeck } = useDeck();

  if (savedDecks.length === 0) return null;

  const avgElixir = (deck) => {
    const used = deck.filter(Boolean);
    if (!used.length) return "0.0";
    const sum = used.reduce((a, c) => a + c.coste_elixir, 0);
    return (sum / used.length).toFixed(2);
  };

  return (
    <div className="saved-decks">
      <h2>Mazos guardados</h2>
      <div className="saved-decks-grid">
        {savedDecks.map((deckObj, i) => (
          <div key={i} className="saved-deck-block">

            {/* FILA SUPERIOR: nombre y avg + botón borrar */}
            <div className="saved-deck-header">
              <div className="top-row">
                <span className="saved-deck-name">{deckObj.name}</span>
                <button
                  className="delete-deck-btn"
                  onClick={() => deleteDeck(i)}
                  title="Eliminar mazo"
                >
                  ✕
                </button>
              </div>
              <span className="saved-deck-avg">Avg: {avgElixir(deckObj.cards)}</span>
            </div>

            {/* GRID DE CARTAS */}
            <div className="saved-deck" onClick={() => loadDeck(deckObj)}>
              {deckObj.cards.map((card, j) => (
                <div key={j} className="saved-card">
                  {card ? (
                    <img src={card.imagen_url} alt={card.nombre} />
                  ) : (
                    <div className="empty-slot">+</div>
                  )}
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
