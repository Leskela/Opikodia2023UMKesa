import {useState} from 'react';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';
import useAppState from '../hooks/useAppState';
import useAction from '../hooks/useAction';

const ShoppingList = (props) => {
	
	const [state,setState] = useState({
		removeIndex:-1,
		editIndex:-1
	})
	
	const {list} = useAppState();
	const {getList,remove,edit} = useAction();
	
	const [search,setSearch] = useState({
		type:""
	})
	
	const onChange = (event) => {
		setSearch({
			type:event.target.value
		})
	}
	
	const searchByType = () => {
		getList(search.type);
		setSearch({
			type:""
		})
	}
	
	const changeMode = (mode,index) => {
		if(mode === "remove") {
			setState({
				removeIndex:index,
				editIndex:-1
			})
		}
		if(mode === "edit") {
			setState({
				removeIndex:-1,
				editIndex:index
			})
		}
		if(mode === "cancel") {
			setState({
				removeIndex:-1,
				editIndex:-1
			})
		}
	}
	
	const removeItem = (id) => {
		remove(id);
		changeMode("cancel");
	}
	
	const editItem = (item) => {
		edit(item);
		changeMode("cancel");
	}

	let items = list.map((item,index) => {
		if(index === state.removeIndex) {
			return(
				<RemoveRow key={item._id} item={item} changeMode={changeMode} removeItem={removeItem}/>
			)
		}
		if(index === state.editIndex) {
			return (
				<EditRow key={item._id} item={item} changeMode={changeMode} editItem={editItem}/>
			)
		}
		return(
			<Row key={item._id} item={item} index={index} changeMode={changeMode}/>
		)
	})
	
	return(
	<div>
		<div style={{margin:"auto"}}>
			<label htmlFor="search">Search by type</label>
			<input type="text"
					name="search"
					id="search"
					onChange={onChange}
					value={search.type}/>
			<button className="btn btn-primary" onClick={searchByType}>Search</button>
		</div>
		<table className="table table-striped">
			<thead>
				<tr>
					<th>Type</th>
					<th>Count</th>
					<th>Price</th>
					<th>Remove</th>
					<th>Edit</th>
				</tr>
			</thead>	
			<tbody>
			{items}
			</tbody>
		</table>
	</div>
	)
}

export default ShoppingList;