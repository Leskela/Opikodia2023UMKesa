import {useContext} from 'react';
import {ThemeContext} from '../context/ThemeContext';


const Paragraph = (props) => {

	const theme = useContext(ThemeContext);
	
	return(
		<p style={{...theme}}>
			{props.children}
		</p>
	)

}

export default Paragraph;