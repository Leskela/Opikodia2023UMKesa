import logo from './logo.svg';
import './App.css';
import ContactCard from './components/ContactCard';
import ContactInfo from './components/ContactInfo';
import NamedChildren from './components/NamedChildren';
import {useState} from 'react';

function App() {
	
	const [click,setClick] = useState(0);
	
	return (
		<div className="App">
			<ContactCard>
				<ContactInfo name="Erno" profession="Koodari"/>
			</ContactCard>
			<ContactCard>
				<h3>Current clicks:{click}</h3>
				<button onClick={() => setClick(click => click+1)}>Click</button>
			</ContactCard>
			<NamedChildren 
				header={<h2>Complex Card</h2>}
				media={<h3>Media area</h3>}
				content={<h3>Content area</h3>}
			/>
			<NamedChildren
				header={<h2>No Media Card</h2>}
				content={<h3>Content area</h3>}
			/>
		</div>
	);
}

export default App;
