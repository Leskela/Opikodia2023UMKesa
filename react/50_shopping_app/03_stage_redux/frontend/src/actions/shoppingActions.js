import {loading,stopLoading,logoutFailed} from './loginActions';
import * as actionConstants from './actionConstants';

//ASYNC THUNKS

export const getList = (token,search) => {
	return async (dispatch) => {
		let url = "/api/shopping"
		if(search) {
			url = url + "?type="+search;
		}
		let request = {
			"method":"GET",
			"headers":{
				"token":token
			}
		}
		dispatch(loading());
		const response = await fetch(url,request);
		dispatch(stopLoading());
		if(!response) {
			dispatch(fetchListFailed("Server never responded. Try again later."));
			return;
		}
		if(response.ok) {
			const list = await response.json();
			if(!list) {
				dispatch(fetchListFailed("Failed to parse shopping information. Try again later."))
				return;
			}
			dispatch(fetchListSuccess(list));
		} else {
			if(response.status === 403) {
				dispatch(logoutFailed("Your session has expired. Logging you out."))
				return;
			}
			dispatch(fetchListFailed("Fetching shopping information failed. Server responded with a status "+response.status+" "+response.statusText));
		}
	}
}

export const add = (token,item) => {
	return async (dispatch) => {
		let request = {
			"method":"POST",
			"headers":{
				"Content-Type":"application/json",
				"token":token
			},
			body:JSON.stringify(item)
		}
		dispatch(loading());
		const response = await fetch("/api/shopping",request);
		dispatch(stopLoading());
		if(!response) {
			dispatch(addItemFailed("Server never responded. Try again later."))
			return;
		}
		if(response.ok) {
			dispatch(addItemSuccess());
			dispatch(getList(token));
		} else {
			if(response.status === 403) {
				dispatch(logoutFailed("Your session has expired. Logging you out."));
				return;
			}
			dispatch(addItemFailed("Failed to add new item. Server responded with a status "+response.status+" "+response.statusText))
		}
	}
}

export const remove = (token,id) => {
	return async (dispatch) => {
		let request = {
			"method":"DELETE",
			"headers":{
				"token":token
			}
		}
		dispatch(loading());
		const response = await fetch("/api/shopping/"+id,request);
		dispatch(stopLoading());
		if(!response) {
			dispatch(removeItemFailed("Server never responded. Try again later."))
			return;
		}
		if(response.ok) {
			dispatch(removeItemSuccess());
			dispatch(getList(token));
		} else {
			if(response.status === 403) {
				dispatch(logoutFailed("Your session has expires. Logging you out."))
				return;
			}
			dispatch(removeItemFailed("Removing item failed. Server responded with a status "+response.status+" "+response.statusText));
		}
	}
}

export const edit = (token,item) => {
	return async (dispatch) => {
		let request = {
			"method":"PUT",
			"headers":{
				"Content-Type":"application/json",
				"token":token
			},
			body:JSON.stringify(item)
		}
		dispatch(loading());
		const response = await fetch("/api/shopping/"+item._id,request);
		dispatch(stopLoading());
		if(!response) {
			dispatch(editItemFailed("Server never responded. Try again later"));
			return;
		}
		if(response.ok) {
			dispatch(editItemSuccess());
			dispatch(getList(token));
		} else {
			if(response.status === 403) {
				dispatch(logoutFailed("Your session has expired. Logging you out."))
				return;
			}
			dispatch(editItemFailed("Failed to edit item. Server responded with a status "+response.status+" "+response.statusText));
		}
	}
}

//ACTION CREATORS

const fetchListSuccess = (list) => {
	return {
		type:actionConstants.FETCH_LIST_SUCCESS,
		list:list
	}
}

const fetchListFailed = (error) => {
	return {
		type:actionConstants.FETCH_LIST_FAILED,
		error:error
	}
}

const addItemSuccess = () => {
	return {
		type:actionConstants.ADD_ITEM_SUCCESS
	}
}

const addItemFailed = (error) => {
	return {
		type:actionConstants.ADD_ITEM_FAILED,
		error:error
	}
}

const removeItemSuccess = () => {
	return {
		type:actionConstants.REMOVE_ITEM_SUCCESS
	}
}

const removeItemFailed = (error) => {
	return {
		type:actionConstants.REMOVE_ITEM_FAILED,
		error:error
	}
}

const editItemSuccess = () => {
	return {
		type:actionConstants.EDIT_ITEM_SUCCESS
	}
}

const editItemFailed = (error) => {
	return {
		type:actionConstants.EDIT_ITEM_FAILED,
		error:error
	}
}