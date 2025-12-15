import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

// Importamos los Providers de contexto, Favorites y Decks
import { FavoritesProvider } from './context/FavoritesContext';
import { DecksProvider } from './context/DecksContext';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FavoritesProvider> 
      <DecksProvider>
          <App />
      </DecksProvider>
    </FavoritesProvider>
  </React.StrictMode>
);
