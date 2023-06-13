const ContactCard = (props) => {
	
	const cardStyle = {
		backgroundColor:"lightgreen",
		height:200,
		width:150,
		margin:10,
		textAlign:"center"
	}
	
	return (
		<div style={cardStyle}>
			{props.children}
		</div>
	)
	
}

export default ContactCard;
