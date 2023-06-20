import React,{useContext} from 'react';
import ThemeContext from '../context/ThemeContext';

interface Props {
	children:React.ReactNode;
}

const Headline:React.FC<Props> = (props:Props) => {
	
	const theme = useContext(ThemeContext);
	
	const style:React.CSSProperties = {
		...theme
	}
	return(
		<h2 style={style}>
			{props.children}
		</h2>
	)
}

export default Headline;