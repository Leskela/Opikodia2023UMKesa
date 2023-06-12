const initialState = {
	list:[],
	id:100
}

const contactReducer = (state = initialState, action) => {
	console.log("contactReducer, action",action);
	console.log("contactReducer, state",state);
	switch(action.type) {
		case "ADD_CONTACT":
			action.contact.id = state.id;
			return {
				list:state.list.concat(action.contact),
				id:state.id+1
			}
		case "REMOVE_CONTACT":
			let tempList = state.list.filter(contact => contact.id !== action.id)
			return {
				...state,
				list:tempList
			}
		default:
			return state;
	}
}

export default contactReducer;