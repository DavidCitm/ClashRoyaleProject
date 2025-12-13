import { createContext, useContext, useState } from "react";

// Contexto para manejar el deck actual y los mazos guardados
const DecksContext = createContext();

export function DecksProvider({ children }) {
  // Estado del deck actual (8 slots)
  const [deck, setDeck] = useState(Array(8).fill(null));

  // Estado de los mazos guardados
  const [savedDecks, setSavedDecks] = useState([]);

  // Guardar el mazo actual en savedDecks
  const saveCurrentDeck = (name) => {
    if (!name) name = `Mazo ${savedDecks.length + 1}`; // nombre por defecto
    setSavedDecks([...savedDecks, { name, cards: deck }]);
  };

  // Cargar un mazo guardado en el deck actual
  const loadDeck = (deckObj) => {
    setDeck(deckObj.cards);
  };

  // Limpiar el deck actual
  const clearDeck = () => setDeck(Array(8).fill(null));

  // Eliminar un mazo guardado por índice
  const deleteDeck = (index) => {
    setSavedDecks(savedDecks.filter((_, i) => i !== index));
  };

  return (
    <DecksContext.Provider
      value={{
        deck,            // deck actual
        setDeck,         // función para modificar deck
        savedDecks,      // mazos guardados
        saveCurrentDeck, // guardar mazo
        loadDeck,        // cargar mazo guardado
        clearDeck,       // limpiar deck
        deleteDeck       // eliminar mazo guardado
      }}
    >
      {children}
    </DecksContext.Provider>
  );
}

// Hook para usar el contexto fácilmente
export const useDeck = () => useContext(DecksContext);
