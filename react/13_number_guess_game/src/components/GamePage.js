import {useState} from 'react';
import useGame from '../hooks/useGame';

const GamePage = (props) => {
	
	const [state,setState] = useState({
		guess:0
	})
	
	const {message,guess} = useGame();
	
	const onChange = (event) => {
		setState({
			guess:event.target.value
		})
	}
	
	const onSubmit = (event) => {
		event.preventDefault();
		guess(state.guess);
	}
	return(
		<div style={{margin:"auto"}}>
			<form onSubmit={onSubmit}>
				<label htmlFor="guess">Guess a number</label>
				<input type="number"
						name="guess"
						id="guess"
						onChange={onChange}
						value={state.guess}/>
				<br/>
				<input type="submit" value="Guess"/>
			</form>
			<h3>{message}</h3>
		</div>
	)
}

export default GamePage;