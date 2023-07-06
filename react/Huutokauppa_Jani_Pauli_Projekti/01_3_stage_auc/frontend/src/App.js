// import './App.css';
import { useState, useEffect } from 'react';
import AdminPage from './components/adminPage';
// import ShoppingForm from './components/ShoppingForm';
// import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {

	const [state, setState] = useState({
		list: [],
		mode: "add", //?
		editauc: {}, //?
		isLogged: false,
		token: "",
		loading: false,
		error: "",
		user: ""
	})

	const [urlRequest, setUrlRequest] = useState({
		url: "",
		request: {},
		action: ""
	})

	//HELPER FUNCTION

	useEffect(() => {
		if (sessionStorage.getItem("state")) {
			let state = JSON.parse(sessionStorage.getItem("state"));
			setState(state);
			if (state.isLogged) {
				getList(state.token);
			}
		}
	}, [])

	const saveToStorage = (state) => {
		sessionStorage.setItem("state", JSON.stringify(state));
	}

	const setLoading = (loading) => {
		setState((state) => {
			return {
				...state,
				loading: loading,
				error: ""
			}
		})
	}

	const setError = (error) => {
		setState((state) => {
			let tempState = {
				...state,
				error: error
			}
			saveToStorage(tempState);
			return tempState;
		})
	}

	const clearState = (error) => {
		let state = {
			list: [],
			isLogged: false,
			loading: false,
			token: "",
			error: error,
			user: ""
		}
		saveToStorage(state);
		setState(state);
	}
	//USEEFFECT

	useEffect(() => {

		const fetchData = async () => {
			if (!urlRequest.url) {
				return;
			}
			setLoading(true);
			const response = await fetch(urlRequest.url, urlRequest.request);
			setLoading(false);
			if (!response) {
				clearState("Server never responded. Logging you out. Try again later.");
				return;
			}
			if (response.ok) {
				switch (urlRequest.action) {
					case "getlist":
						const data = await response.json();
						if (!data) {
							setError("Failed to parse shopping information. Try again later.");
							return;
						}
						setState((state) => {
							let tempState = {
								...state,
								list: data
							}
							saveToStorage(tempState);
							return tempState;
						})
						return;
						getList();
						return;
					
					case "addevent":
						getList()
						return
					case "removeevent":
						getList()
						return
					case "editevent":
						getList()
						setState((state) => {
							return {
							...state,
							mode: "add",
							editauc: {}
							}
						})


					case "register":
						setError("Register success");
						return;
					case "login": //Sisäänkirjaus!
						const loginData = await response.json();
						if (!loginData) {
							setError("Failed to parse login information. Try again later.");
							return;
						}
						setState((state) => {
							let tempState = {
								...state,
								isLogged: true,
								token: loginData.token
							}
							saveToStorage(tempState);
							return tempState;
						})
						getList(loginData.token);
						return;
					case "logout":
						clearState("");
						return;
					default:
						return;
				}
			} else {
				if (response.status === 403) {
					clearState("Your session has expired. Logging you out.");
					return;
				}
				let errorMessage = " Server responded with a status " + response.status + " " + response.statusText
				switch (urlRequest.action) {
					case "register":
						if (response.status === 409) {
							setError("Username already in use");
							return;
						} else {
							setError("Register failed." + errorMessage);
							return;
						}
					case "login":
						setError("Login failed." + errorMessage);
						return;
					case "getlist":
						setError("Failed to fetch shopping information." + errorMessage);
						return;
					// case "additem":
					// 	setError("Failed to add new item." + errorMessage);
					// 	return;
					// case "removeitem":
					// 	setError("Failed to remove item." + errorMessage);
					// 	return;
					// case "edititem":
					// 	setError("Failed to edit item." + errorMessage);
					// 	return;
					case "logout":
						clearState("Server responded with an error. Logging you out.");
						return;
					default:
						return;

				}
			}
		}

		fetchData();
	}, [urlRequest]);

	//REST API

	const getList = (token, search) => {
		let tempToken = state.token;
		if (token) {
			tempToken = token;
		}
		let url = "/api/aucevents";
		if (search) {
			url = url + "?type=" + search;
		}
		setUrlRequest({
			url: url,
			request: {
				"method": "GET",
				"headers": {
					"token": tempToken
				}
			},
			action: "getlist"
		})
	}

	// const addItem = (item) => {
	// 	setUrlRequest({
	// 		url: "/api/shopping",
	// 		request: {
	// 			"method": "POST",
	// 			"headers": {
	// 				"Content-Type": "application/json",
	// 				"token": state.token
	// 			},
	// 			"body": JSON.stringify(item)
	// 		},
	// 		action: "additem"
	// 	})
	// }

	// const removeItem = (id) => {
	// 	setUrlRequest({
	// 		url: "/api/shopping/" + id,
	// 		request: {
	// 			"method": "DELETE",
	// 			"headers": {
	// 				"token": state.token
	// 			}
	// 		},
	// 		action: "removeitem"
	// 	})
	// }

	// const editItem = (item) => {
	// 	setUrlRequest({
	// 		url: "/api/shopping/" + item._id,
	// 		request: {
	// 			"method": "PUT",
	// 			"headers": {
	// 				"Content-Type": "application/json",
	// 				"token": state.token
	// 			},
	// 			"body": JSON.stringify(item)
	// 		},
	// 		action: "edititem"
	// 	})
	// }

	//LOGIN API

	const register = (user) => {
		setUrlRequest({
			url: "/register",
			request: {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(user)
			},
			action: "register"
		})
	}

	const login = (user) => {
		setUrlRequest({
			url: "/login",
			request: {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(user)
			},
			action: "login"
		})
		setState((state) => {
			return {
				...state,
				user: user.username
			}
		})
	}

	const logout = () => {
		setUrlRequest({
			url: "/logout",
			request: {
				method: "POST",
				headers: {
					"token": state.token
				}
			},
			action: "logout"
		})
	}


	// Actionit REST-käyttöön

	// const getActList = () => {
	// 	setUrlRequest({
	// 	url:"/api/aucevents",
	// 	request:{
	// 		"method":"GET"
	// 	},
	// 	action:"getlist"			
	// 	})
	// }
	
	const addEvent = (auction) => {
		setUrlRequest({
		url:"/api/aucevents",
		request:{
			"method":"POST",
			"headers":{
				"token": state.token,
			"Content-Type":"application/json"
			},
			"body":JSON.stringify(auction)
		},
		action:"addevent"
		})
	}
	
	const removeEvent = (id) => {
		setUrlRequest({
		url:"/api/aucevents/"+id,
		request:{
			"method":"DELETE",
			"headers":{
				"token": state.token,
			}
		},
		action:"removeevent"
		})
	}
	
	const changeToEditMode =(editauc) => {
		setState((state)=> {
		return {
			...state,
			mode:"edit",
			editauc:editauc
		}
		})
	}
	
	const editEvent = (auction) => {
		setUrlRequest({
		url:"/api/aucevents/"+auction._id,
		request:{
			"method":"PUT",
			"headers":{
				"token": state.token,
			"Content-type":"application/json"
			},
			"body":JSON.stringify(auction)
		},
		action:"editevent"
		})
	}

	// RENDERING

	let message = <h4></h4>
	if (state.loading) {
		message = <h4>Loading ...</h4>
	}
	if (state.error) {
		message = <h4>{state.error}</h4>
	}
	if (state.isLogged) {
		return (
			<div className="App">
				<h1>#308 Janin ja Paulin Huutokauppa palvelu Oy</h1> {/*Koska Route*/}
				<Navbar logout={logout} isLogged={state.isLogged} user={state.user} />
				<div style={{ height: 25, textAlign: "center" }}>
					{message}
				</div>
				<Routes>
					{/* <Route path="/" element={<ShoppingList list={state.list} removeItem={removeItem} editItem={editItem} getList={getList}/>}/> */}
					{/* <Route path="/form" element={<ShoppingForm addItem={addItem}/>}/> */}
					<Route path="/admin"
						element={<AdminPage
							addEvent={addEvent}
							mode={state.mode}
							editauc={state.editauc}
							editEvent={editEvent}
							list={state.list}
							removeEvent={removeEvent}
							changeToEditMode={changeToEditMode} />
						} />

					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</div>
		);
	} else {
		return (
			<div className="App">
				<h1>Janin ja Paulin Huutokauppa palvelu Oy (Login)</h1> {/*Koska Route*/}
				<Navbar logout={logout} isLogged={state.isLogged} user={state.user} />
				<div style={{ height: 25, textAlign: "center" }}>
					{message}
				</div>
				<Routes>
					<Route path="/" element={<LoginPage login={login} register={register} setError={setError} />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</div>
		)
	}
}

	// <NewAuctionForm addEvent={addEvent} mode={state.mode} editauc={state.editauc} editEvent={editEvent} />
	// <AuctionsList list={state.list} removeEvent={removeEvent} changeToEditMode={changeToEditMode} />
export default App;
