import AppStateContext from '../context/AppStateContext';
import {useContext} from 'react';

const useAppState = () => {
	return useContext(AppStateContext);
}

export default useAppState;