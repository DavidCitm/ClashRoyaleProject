import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from './pages/HomePage';
import CardDetail from "./pages/CardDetail";
import Arenas from "./pages/Arenas";
import FavoritesPage from "./pages/FavoritesPage";
import DeckBuilder from "./pages/DeckBuilder";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
        <div className="app-layout">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/personaje/:id" element={<CardDetail />} />
            <Route path="/arenas" element={<Arenas />} />
            <Route path="/mazo" element={<DeckBuilder />} />
            <Route path="/favorits" element={<FavoritesPage />} />
          </Routes>
        </main>
        <Footer />
        </div>
    </BrowserRouter>
  );
}
