import {useState} from 'react';
import Square from './Square';
import Label from './Label';

const Card = (props) => {

	const [state,setState] = useState({
		color:"red"
	})
	
	let cardStyle = {
		height:200,
		width:150,
		backgroundColor:"#FFFFFF",
		filter:"drop-shadow(0px 0px 5px #666)",
		WebkitFilter:"drop-shadow(0px 0px 5px #666)"
	}
	
    const onColorChange = () => {
        let color = "#";
        const letters = "ABCDEF0123456789";
        for(let i=0;i<6;i++) {
            let temp = Math.floor(Math.random()*16);
            color = color + letters[temp]
        }
        setState({
            color:color
        })
    }
	
    return (
		<div style={cardStyle}>
			<Square color={state.color}/>
			<Label color={state.color} onColorChange={onColorChange}/>
		</div>
	)
}

export default Card;