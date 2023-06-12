import './App.css';
import {useState,useEffect} from 'react';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import {Routes,Route,Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

function App() {
		
	const appState = useSelector(state => state);
	
	// RENDERING
	
	let message =<h4></h4>
	if(appState.login.loading) {
		message = <h4>Loading ...</h4>
	}
	if(appState.shopping.error) {
		message = <h4>{appState.shopping.error}</h4>
	}
	if(appState.login.error) {
		message = <h4>{appState.login.error}</h4>
	}
	if(appState.login.isLogged) {
		return (
			<div className="App">
				<Navbar />
				<div style={{height:25, textAlign:"center"}}>
					{message}
				</div>
				<Routes>			
					<Route path="/" element={<ShoppingList />}/>
					<Route path="/form" element={<ShoppingForm />}/>
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
			</div>
		);
	} else {
		return(
			<div className="App">
				<Navbar />
				<div style={{height:25, textAlign:"center"}}>
					{message}
				</div>
				<Routes>			
					<Route path="/" element={<LoginPage />}/>
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
			</div>		
		)
	}
}

export default App;