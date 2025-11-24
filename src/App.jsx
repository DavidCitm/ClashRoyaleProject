import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from './HomePage';
import Body from './Body';


function App() {
  return (
    <>
      <Header />
      {/* Body es la tabla y HomePage las cartas*/}
      {/* <HomePage /> */}
      <Body />
      <Footer />
    </>
  )
}

export default App;
