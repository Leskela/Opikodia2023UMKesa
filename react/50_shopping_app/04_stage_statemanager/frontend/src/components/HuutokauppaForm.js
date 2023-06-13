import {useState} from 'react';

//const ShoppingForm = (props) => {
const HuutokauppaForm = (props) => {
	
	const [state,setState] = useState({
		type:"",
		count:0,
		price:0,
		auc_name:"",
		auc_starttime:"",
		auc_endtime:""
	})
	
	//Lisää joka painaluksella aron event.target.name!
	const onChange = (event) => {
		console.log("###15", event.target.name)
		console.log("###16", event.target.value)

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
			price:0,
			auc_name:"",
			auc_starttime:"",
			auc_endtime:""
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
				<label htmlFor="type" className="form-label">Huutokaupan tiedot:</label>
				<label htmlFor="count" className="form-label">Nimi:</label>
				<input type="text"
						className="form-control"
						name="auc_name"
						id="auc_name"
						onChange={onChange}
						value={state.auc_name}/>
				<label htmlFor="count" className="form-label">Alkamisaika:</label>
				<input type="text"
						className="form-control"
						name="auc_starttime"
						id="auc_starttime"
						onChange={onChange}
						value={state.auc_starttime}/>
				<label htmlFor="count" className="form-label">Päättymisaika:</label>
				<input type="text"
						className="form-control"
						name="auc_endtime"
						id="auc_endtime"
						onChange={onChange}
						value={state.auc_endtime}/>

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
				<input type="submit" className="btn btn-primary" value="Add 33"/>
			</form>
		</div>
	)
}

export default HuutokauppaForm; //ShoppingForm;