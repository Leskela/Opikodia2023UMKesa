import React,{useContext} from 'react';
import ThemeContext from '../context/ThemeContext';

interface Props {
	children:React.ReactNode;
}

const Paragraph:React.FC<Props> = (props:Props) => {
	
	const theme = useContext(ThemeContext);
	
	const style:React.CSSProperties = {
		...theme
	}
	return(
		<p style={style}>
			{props.children}
		</p>
	)
}

export default Paragraph;