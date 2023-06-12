import logo from './logo.svg';
import './App.css';
import useCount from './hooks/useCount';

function App() {

  const [value,add,substract] = useCount(10);

  return (
    <div className="App">
      <h4>Count:{value}</h4>
      <button onClick={add}>+</button>
      <button onClick={substract}>-</button>
    </div>
  );
}

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

export default App;
