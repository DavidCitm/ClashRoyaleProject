import {Routes, Route} from 'react-router-dom'; 
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from './HomePage';


function App() {
  return (
    <>
      <Header />

      {/* esto hay que hacer route */}
      <HomePage /> 


      
      <Footer />
    </>
  )
}

export default App;
