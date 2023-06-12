import {useState} from 'react';

const ShoppingForm = (props) => {
	const [state,setState] = useState({
		type:"",
		count:0,
		price:0
	})
	
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
		let item = {
			...state
		}
		props.addItem(item);
		setState({
			type:"",
			count:0,
			price:0
		})
	}
	
	return(
		<div style={{
			"backgroundColor":"lightblue",
			"margin":"auto",
			"width":"40%",
			"textAlign":"center"
		}}>
			<form className="mb-5" onSubmit={onSubmit}>
				<label htmlFor="type" className="form-label">Type:</label>
				<input type="text"
						className="form-control"
						name="type"
						id="type"
						onChange={onChange}
						value={state.type}/>
				<label htmlFor="count" className="form-label">Count:</label>
				<input type="number"
						className="form-control"
						name="count"
						id="count"
						onChange={onChange}
						value={state.count}/>
				<label htmlFor="price" className="form-label">Price:</label>
				<input type="number"
						className="form-control"
						name="price"
						id="price"
						step="0.01"
						onChange={onChange}
						value={state.price}/>
				<input type="submit" className="btn btn-primary" value="Add"/>
			</form>
		</div>
	)
}

export default ShoppingForm;