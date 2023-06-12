import logo from './logo.svg';
import './App.css';
import {Routes,Route,Link,Navigate} from 'react-router-dom';
import Home from './components/Home'
import About from './components/About'
import Securet from './components/Securet'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ul style={{"listStyleType":"none"}}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/About">About</Link></li>
        </ul>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/Securet" element={<Securet/>}/>
          <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
