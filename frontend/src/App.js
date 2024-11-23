
import './App.css';
import Navbar from './components/Navbar';
import WordToPdfConverter from './components/WordToPDF';
import bg from "./assets/bg.jpg";

function App() {
  return (
    <div className="App" style={{
      background: `url(${bg}) no-repeat center center fixed`,
      backgroundSize: 'cover',
    }}>
      <Navbar />
      <WordToPdfConverter />
    </div>
  );
} 

export default App;
