//import logo from './logo.svg';
import './App.css';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';

function App() {
  return (
    <div className="App">
      <ContactForm/>
      <hr/>
      <ContactList/>
    </div>
  );
}

export default App;
