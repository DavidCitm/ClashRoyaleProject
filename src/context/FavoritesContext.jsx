import { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const toggleFavorite = (post) => {
    const exists = favorites.find(fav => fav.id === post.id);
    if (exists) {
      setFavorites(favorites.filter(fav => fav.id !== post.id));
    } else {
      setFavorites([...favorites, post]);
    }
  };

  const isFavorite = (id) => favorites.some(fav => fav.id === id);

  return (
    <FavoritesContext.Provider value={{
      favorites,
      toggleFavorite,
      isFavorite,
      showOnlyFavorites,
      setShowOnlyFavorites
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);