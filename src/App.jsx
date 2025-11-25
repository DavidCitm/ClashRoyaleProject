// App.jsx
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from './HomePage';

function App() {
  return (
    <div className="app-layout">
      <Header />
      
      {/* Renderizamos HomePage directamente */}
      <main className="app-content">
        <HomePage />
      </main>

      <Footer />
    </div>
  )
}

export default App;