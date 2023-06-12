import {useState} from 'react';

//const ShoppingForm = (props) => {
const HuutokauppaForm = (props) => {
	
	const [state,setState] = useState({
		// type:"",
		// count:0,
		// price:0,
		auction_name:"",
		auction_starttime:"",
		auction_endtime:"",
		auction_desription:"",
		auction_adress:"",
		auction_phone:""
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
			// type:"",
			// count:0,
			// price:0,
			auction_name:"",
			auction_starttime:"",
			auction_endtime:"",
			auction_desription:"",
			auction_adress:"",
			auction_phone:""	
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

				<label htmlFor="auction_name" className="form-label">Nimi:</label>
				<input type="text"
						className="form-control"
						name="auction_name"
						id="auction_name"
						onChange={onChange}
						value={state.auction_name}/>

				<label htmlFor="auction_starttime" className="form-label">Alkamisaika:</label>
				<input type="datetime-local"
						className="form-control"
						name="auction_starttime"
						id="auction_starttime"
						onChange={onChange}
						value={state.auction_starttime}/>

				<label htmlFor="auction_endtime" className="form-label">Päättymisaika:</label>
				<input type="datetime-local"
						className="form-control"
						name="auction_endtime"
						id="auction_endtime"
						onChange={onChange}
						value={state.auction_endtime}/>

				<label htmlFor="auction_desription" className="form-label">Huutokaupan tiedot:</label>
				<input type="text"
						className="form-control"
						name="auction_desription"
						id="auction_desription"
						onChange={onChange}
						value={state.auction_desription}/>

				<label htmlFor="auction_adress" className="form-label">Huutokaupan osoite:</label>
				<input type="text"
						className="form-control"
						name="auction_adress"
						id="auction_adress"
						onChange={onChange}
						value={state.auction_adress}/>

				<label htmlFor="auction_phone" className="form-label">Huutokaupan puhelin:</label>
				<input type="text"
						className="form-control"
						name="auction_phone"
						id="auction_phone"
						onChange={onChange}
						value={state.auction_phone}/>

				{/*<label htmlFor="type" className="form-label">Type:</label>
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
				value={state.price}/>*/}
				<input type="submit" className="btn btn-primary" value="Add 33"/>
			</form>
		</div>
	)
}

export default HuutokauppaForm; //ShoppingForm;