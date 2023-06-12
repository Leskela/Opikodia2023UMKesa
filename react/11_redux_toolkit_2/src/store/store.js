import shoppingReducer from './shoppingSlice';
import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({
	reducer:shoppingReducer
})

export default store;