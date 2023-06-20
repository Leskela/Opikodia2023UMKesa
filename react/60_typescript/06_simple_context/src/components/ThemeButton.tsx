import React,{useContext} from 'react';
import ThemeContext from '../context/ThemeContext';

interface Props {
	toggleTheme():void;
}

const ThemeButton:React.FC<Props> = (props:Props) => {
	
	const theme = useContext(ThemeContext);
	
	const style:React.CSSProperties = {
		...theme
	}
	return(
		<button style={style} onClick={props.toggleTheme}>
			Toggle Theme
		</button>
	)
}

export default ThemeButton;