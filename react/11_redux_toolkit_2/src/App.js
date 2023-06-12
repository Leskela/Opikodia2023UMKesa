import './App.css';
import {useState,useEffect} from 'react';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import {Routes,Route,Navigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {getList} from './store/shoppingSlice';

function App() {
	
	const dispatch = useDispatch();
	
	useEffect(() => {
		dispatch(getList());
	},[])
	
	return (
		<div className="App">
			<Navbar/>
			<Routes>			
				<Route path="/" element={<ShoppingList />}/>
				<Route path="/form" element={<ShoppingForm />}/>
				<Route path="*" element={<Navigate to="/"/>}/>
			</Routes>
		</div>
	);
}

export default App;