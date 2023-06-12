import {useNavigate} from 'react-router-dom';

const About = (props) => {
	
	const navigate = useNavigate();
	
	return(
		<div>
			<h2>This is an example app for React Router</h2>
			<button onClick={() => navigate("/secret")}>Go to secret page</button>
		</div>
	)
}

export default About;