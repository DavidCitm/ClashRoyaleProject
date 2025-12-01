// App.jsx
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from './pages/HomePage';
import CardDetail from "./pages/CardDetail";
import Arenas from "./pages/Arenas"; // ← IMPORTANTE
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
            <Route path="/arenas" element={<Arenas />} /> {/* ← AQUÍ VA */}
          </Routes>
        </main>

        <Footer />

      </div>
    </BrowserRouter>
  );
}
