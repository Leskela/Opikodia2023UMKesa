import React from 'react';
import logo from './logo.svg';
import './App.css';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
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
