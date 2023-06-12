import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';

export const getList = createAsyncThunk("getlist",async (data,thunkAPI) => {
	const request = {
		"method":"GET"
	}
	const response = await fetch("/api/shopping",request);
	const list = await response.json();
	return list;
});

export const add = createAsyncThunk("add",async (item,thunkAPI) => {
	const request = {
		"method":"POST",
		"headers":{
			"Content-type":"application/json"
		},
		"body":JSON.stringify(item)
	}
	const response = await fetch("/api/shopping",request);
	if(response.ok) {
		thunkAPI.dispatch(getList());
	}
	return {"Message":"Done"}
});

export const remove = createAsyncThunk("remove", async (id,thunkAPI) => {
	const request = {
		"method":"DELETE"
	}
	const response = await fetch("/api/shopping/"+id,request);
	if(response.ok) {
		thunkAPI.dispatch(getList());
	}
	return {"Message":"Done"}
});

export const edit = createAsyncThunk("edit", async (item,thunkAPI) => {
	const request = {
		"method":"PUT",
		"headers":{
			"Content-type":"application/json"
		},
		"body":JSON.stringify(item)
	}
	const response = await fetch("/api/shopping/"+item._id,request);
	if(response.ok) {
		thunkAPI.dispatch(getList());
	}
	return {"Message":"Done"}
})

const initialState = {
	list:[]
}

const shoppingSlice = createSlice({
	name:"shopping",
	initialState,
	reducers:{},
	extraReducers: (builder) => {
		builder.addCase(getList.fulfilled, (state,action) => {
			state.list = action.payload
		})	
		builder.addCase(add.fulfilled, (state,action) => {
			console.log(action);
		})
		builder.addCase(remove.fulfilled, (state,action) => {
			console.log(action);
		})
		builder.addCase(edit.fulfilled, (state,action) => {
			console.log(action);
		})		
	}
})

export default shoppingSlice.reducer;