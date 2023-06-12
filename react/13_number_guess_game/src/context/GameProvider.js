import {useState} from 'react';
import GameContext from './GameContext';
import {useNavigate} from 'react-router-dom';

const GameProvider = (props) => {
	
	const [state,setState] = useState({
		playerName:"",
		targetNumber:0,
		noOfGuesses:0,
		minimumGuess:1,
		maximumGuess:100,
		message:""
	})
	
	const navigate = useNavigate();
	
	const startGame = (name) => {
		if(!name) {
			setState((state) => {
				return {
					...state,
					message:"Please enter your name."
				}
			})
			return;
		}
		const target = Math.floor(Math.random()*100)+1;
		const message = "Hello "+name+". Guess a number between "+state.minimumGuess+" and "+state.maximumGuess+".";
		setState((state) => {
			return {
				...state,
				playerName:name,
				message:message,
				targetNumber:target
			}
		})
		navigate("/game");
	}
	
	const guess = (guess) => {
		if(state.targetNumber === 0) {
			setState({
				targetNumber:0,
				playerName:"",
				noOfGuesses:0,
				minimumGuess:1,
				maximumGuess:100,
				message:""
			})
			navigate("/");
		}
		if(isNaN(guess)) {
			let message = "Please enter a NUMBER between "+state.minimumGuess+" and "+state.maximumGuess+".";
			setState((state) => {
				return {
					...state,
					message:message
				}
			})
			return;
		}
		let tempGuess = parseInt(guess);
		if(tempGuess < state.minimumGuess || tempGuess > state.maximumGuess) {
			let message = "Please enter a number between "+state.minimumGuess+" and "+state.maximumGuess+"."
			setState((state) => {
				return {
					...state,
					message:message
				}
			})
			return;
		}
		if(tempGuess < state.targetNumber && tempGuess >= state.minimumGuess) {
			let message = "You guessed too low. Guess between "+guess+" and "+state.maximumGuess+"."
			setState((state) => {
				return {
					...state,
					noOfGuesses:state.noOfGuesses+1,
					minimumGuess:guess,
					message:message
				}
			})
			return;
		}
		if(tempGuess > state.targetNumber && tempGuess <= state.maximumGuess) {
			let message = "You guessed too high. Guess between "+state.minimumGuess+" and "+guess+"."
			setState((state) => {
				return {
					...state,
					noOfGuesses:state.noOfGuesses+1,
					maximumGuess:guess,
					message:message
				}
			})
			return;
		}
		if(tempGuess === state.targetNumber) {
			let noOfGuesses = state.noOfGuesses+1;
			alert("Congrats "+state.playerName+"! You won with "+noOfGuesses+" guesses.");
			setState({
				playerName:"",
				noOfGuesses:0,
				targetNumber:0,
				maximumGuess:100,
				minimumGuess:0,
				message:""
			})
			navigate("/");
			return;
		}
		console.log("Should not come here");
	}
	
	return(
		<GameContext.Provider value={{
			startGame:startGame,
			guess:guess,
			message:state.message
		}}>
			{props.children}
		</GameContext.Provider>
	)
}

export default GameProvider;