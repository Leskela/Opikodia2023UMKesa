import {useState,useEffect} from 'react';

const StatefulComponent = (props) => {
	
	const [state,setState] = useState({
		count:0
	})
	
	const tick = () => {
		setState((state) => {
			return {
				count:state.count+1
			}
		})
	}
	
	useEffect(() => {
		
		let interval = setInterval(tick,1000);
		
		return () => clearInterval(interval);
	},[]);
	
	return(
		<h3>{state.count} seconds since you entered the page</h3>
	)
}

export default StatefulComponent;