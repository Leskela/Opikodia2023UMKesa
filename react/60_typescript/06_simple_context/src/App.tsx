import React from 'react';
//import logo from './logo.svg';
import './App.css';
import ThemeContext,{themes,ThemeType} from './context/ThemeContext';
import {useState} from 'react';
import Headline from './components/Headline';
import Paragraph from './components/Paragraph';
import ThemeButton from './components/ThemeButton';

interface State {
	theme:ThemeType;
}

function App() {
	
	const [state,setState] = useState<State>({
		theme:themes.dark
	})
	
	const toggleTheme = () => {
		if(state.theme === themes.dark) {
			setState({
				theme:themes.light
			})
		} else {
			setState({
				theme:themes.dark
			})
		}
	}
	
	return (
	<ThemeContext.Provider value={state.theme}>
		<div className="App">
			<Headline>
				About this Handbook
			</Headline>
			<Paragraph>
				Over 20 years after its introduction to the programming community, JavaScript is now one of the most widespread cross-platform languages ever created. Starting as a small scripting language for adding trivial interactivity to webpages, JavaScript has grown to be a language of choice for both frontend and backend applications of every size. While the size, scope, and complexity of programs written in JavaScript has grown exponentially, the ability of the JavaScript language to express the relationships between different units of code has not. Combined with JavaScript’s rather peculiar runtime semantics, this mismatch between language and program complexity has made JavaScript development a difficult task to manage at scale
			</Paragraph>
			<ThemeButton toggleTheme={toggleTheme}/>
		</div>
	</ThemeContext.Provider>
	);
}

export default App;
