import {useState} from 'react';
import {useDispatch} from 'react-redux';

const ContactForm = (props) => {
	
	const [state,setState] = useState({
		firstname:"",
		lastname:"",
		email:"",
		phone:""
	})
	
	const dispatch = useDispatch();
	
	const onChange = (event) => {
		setState((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
	}
	
	const onSubmit = (event) => {
		event.preventDefault();
		let contact = {
			...state
		}
		dispatch({
			type:"ADD_CONTACT",
			contact:contact
		})
		setState({
			firstname:"",
			lastname:"",
			email:"",
			phone:""
		})
	}
	
	return(
		<div style={{
			"backgroundColor":"lightgreen",
			"width":"40%",
			"margin":"auto"
		}}>
			<form onSubmit={onSubmit}>
				<label htmlFor="firstname">First Name</label>
				<input type="text"
						name="firstname"
						id="firstname"
						onChange={onChange}
						value={state.firstname}/>
				<br/>
				<label htmlFor="lastname">Last Name</label>
				<input type="text"
						name="lastname"
						id="lastname"
						onChange={onChange}
						value={state.lastname}/>
				<br/>
				<label htmlFor="email">Email</label>
				<input type="email"
						name="email"
						id="email"
						onChange={onChange}
						value={state.email}/>
				<br/>
				<label htmlFor="phone">Phone</label>
				<input type="text"
						name="phone"
						id="phone"
						onChange={onChange}
						value={state.phone}/>
				<br/>
				<input type="submit" value="Add"/>
			</form>
		</div>
	)
}

export default ContactForm;