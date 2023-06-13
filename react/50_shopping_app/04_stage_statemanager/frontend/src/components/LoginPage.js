import {useState} from 'react';
import useAction from '../hooks/useAction';

const LoginPage = (props) => {
	
	const [state,setState] = useState({
		username:"",
		password:""
	})
	
	const {register,login,setError} = useAction();
 	
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
		if(state.username.length < 4 ||state.password.length < 8) {
			setError("Username must be atleast 4 characters and password 8 characters long.");
			return;
		}
		let user = {
			...state
		}
		if(event.target.name === "register") {
			register(user);
		} else {
			login(user);
		}
	}
	
	return(
		<div style={{
			backgroundColor:"lightblue",
			width:"40%",
			margin:"auto",
			textAlign:"center"
		}}>
			<form className="mb-5">
				<label htmlFor="username" className="form-label">Username</label>
				<input type="text"
						name="username"
						id="username"
						className="form-control"
						onChange={onChange}
						value={state.username}/>
				<label htmlFor="password" className="form-label">Password</label>
				<input type="password"
						name="password"
						id="password"
						className="form-control"
						onChange={onChange}
						value={state.password}/>
				<button name="register" onClick={onSubmit} style={{marginRight:5}} className="btn btn-secondary">Register</button>
				<button name="login" onClick={onSubmit} style={{marginLeft:5}} className="btn btn-secondary">Login</button>
			</form>
		</div>
		
	)
}

export default LoginPage;