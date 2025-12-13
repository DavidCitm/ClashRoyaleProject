// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { FavoritesProvider } from './context/FavoritesContext';
import { DecksProvider } from './context/DecksContext';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FavoritesProvider> {/* Emboliquem l'App (i el Router) */}
      <DecksProvider>
        <App />
      </DecksProvider>
    </FavoritesProvider>
  </React.StrictMode>
);
