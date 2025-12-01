// App.jsx
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from './pages/HomePage';
import CardDetail from "./pages/CardDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";




export default function App() {
  return (
    <div className="app-layout">
      
      <main>
        
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/personaje/:id" element={<CardDetail />} />
            
          </Routes>
          <Footer />
        </BrowserRouter>
        
      </main>

      
    </div>
  );
}
