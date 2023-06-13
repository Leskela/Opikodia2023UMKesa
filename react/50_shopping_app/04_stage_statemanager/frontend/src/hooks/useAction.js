import ActionContext from '../context/ActionContext';
import {useState,useEffect,useContext} from 'react';
import * as actionConstants from '../context/actionConstants';
import useAppState from './useAppState';

const useAction = () => {
	
	const [state,setState] = useState({
		url:"",
		request:{},
		action:""
	})
	
	const {dispatch} = useContext(ActionContext);
	
	const {token} = useAppState();
	
	useEffect(() => {
		
		const fetchData = async () => {
			if(!state.url) {
				return;
			}
			dispatch({
				"type":actionConstants.LOADING
			})
			const response = await fetch(state.url,state.request);
			dispatch({
				"type":actionConstants.STOP_LOADING
			})
			if(!response) {
				dispatch({
					"type":actionConstants.LOGOUT_FAILED,
					"error":"Server never responded. Logging you out."
				})
				return;
			}
			if(response.ok) {
				switch(state.action) {
					case "register":
						dispatch({
							"type":actionConstants.REGISTER_SUCCESS
						})
						return;
					case "login":
						const data = await response.json();
						if(!data) {
							dispatch({
								"type":actionConstants.LOGIN_FAILED,
								"error":"Failed to parse login information. Try again later."
							})
							return;
						}
						dispatch({
							"type":actionConstants.LOGIN_SUCCESS,
							"token":data.token
						})
						return;
					case "logout":
						dispatch({
							"type":actionConstants.LOGOUT_SUCCESS
						})
						return;
					case "getlist":
						const list = await response.json();
						if(!list) {
							dispatch({
								"type":actionConstants.FETCH_LIST_FAILED,
								"error":"Failed to parse shopping information. Try again later."
							})
							return;
						}
						dispatch({
							"type":actionConstants.FETCH_LIST_SUCCESS,
							list:list
						})
						return;
					case "add":
						dispatch({
							"type":actionConstants.ADD_ITEM_SUCCESS
						})
						getList();
						return;
					case "remove":
						dispatch({
							"type":actionConstants.REMOVE_ITEM_SUCCESS
						})
						getList();
						return;
					case "edit":
						dispatch({
							"type":actionConstants.EDIT_ITEM_SUCCESS
						})
						getList();
						return;					
					default:
						return;
				}
			} else {
				if(response.status === 403) {
					dispatch({
						"type":actionConstants.LOGOUT_FAILED,
						"error":"Your session has expired. Logging you out."
					})
					return;
				}
				let errorMessage = " Server responded with a status "+response.status+" "+response.statusText;
				switch(state.action) {
					case "register":
						if(response.status === 409) {
							dispatch({
								"type":actionConstants.REGISTER_FAILED,
								"error":"Username already in use."
							})
							return;
						}
						dispatch({
							"type":actionConstants.REGISTER_FAILED,
							"error":"Register failed."+errorMessage
						})
						return;
					case "login":
						dispatch({
							"type":actionConstants.LOGIN_FAILED,
							"error":"Login failed."+errorMessage
						})
						return;
					case "logout":
						dispatch({
							"type":actionConstants.LOGOUT_FAILED,
							"error":"Server responded with an error. Logging you out."
						})
						return;
					case "getlist":
						dispatch({
							"type":actionConstants.FETCH_LIST_FAILED,
							"error":"Failed to fetch shopping information."+errorMessage
						})
						return;
					case "add":
						dispatch({
							"type":actionConstants.ADD_ITEM_FAILED,
							"error":"Failed to add new item."+errorMessage
						})
						return;
					case "remove":
						dispatch({
							"type":actionConstants.REMOVE_ITEM_FAILED,
							"error":"Failed to remove item."+errorMessage
						})
						return;
					case "edit":
						dispatch({
							"type":actionConstants.EDIT_ITEM_FAILED,
							"error":"Failed to update item."+errorMessage
						})
						return;
					default:
						return;
				}
			}
		}
		
		fetchData();
		
	}, [state]);

	//FUNCTIONS
	
	const register = (user) => {
		setState({
			"url":"/register",
			"request":{
				"method":"POST",
				"headers":{
					"Content-Type":"application/json"
				},
				"body":JSON.stringify(user)
			},
			"action":"register"
		})
	}
	
	const login = (user) => {
		dispatch({
			"type":actionConstants.SET_USERNAME,
			"user":user.username
		})
		setState({
			"url":"/login",
			"request":{
				"method":"POST",
				"headers":{
					"Content-Type":"application/json"
				},
				"body":JSON.stringify(user)
			},
			"action":"login"
		})
	}
	
	const logout = () => {
		setState({
			"url":"/logout",
			"request":{
				"method":"POST",
				"headers":{
					"token":token
				}
			},
			"action":"logout"
		})
	}
	
	const setError = (error) => {
		dispatch({
			"type":actionConstants.REGISTER_FAILED,
			"error":error
		})
	}
	
	const getList = (search) => {
		let url = "/api/shopping";
		if(search) {
			url = url + "?type="+search;
		}
		setState({
			"url":url,
			"request":{
				"method":"GET",
				"headers":{
					"token":token
				}
			},
			"action":"getlist"
		})
	}
	
	const add = (item) => {
		setState({
			"url":"/api/shopping",
			"request":{
				"method":"POST",
				"headers":{
					"Content-Type":"application/json",
					"token":token
				},
				"body":JSON.stringify(item)
			},
			"action":"add"
		})
	}
	
	const remove = (id) => {
		setState({
			"url":"/api/shopping/"+id,
			"request":{
				"method":"DELETE",
				"headers":{
					"token":token
				}
			},
			"action":"remove"
		})
	}
	
	const edit = (item) => {
		setState({
			"url":"/api/shopping/"+item._id,
			"request":{
				"method":"PUT",
				"headers":{
					"Content-Type":"application/json",
					"token":token
				},
				"body":JSON.stringify(item)
			},
			"action":"edit"
		})
	}
	
	return {register,login,logout,setError,getList,add,remove,edit}
}

export default useAction;