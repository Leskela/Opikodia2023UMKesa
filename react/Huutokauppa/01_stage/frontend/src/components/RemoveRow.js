const RemoveRow = (props) => {

	return(
		<tr>
			<td>{props.item.type}</td>
			<td>{props.item.count}</td>
			<td>{props.item.price}</td>
			<td>{props.item.auction_name}</td>
			<td>{props.item.auction_starttime}</td>
			<td>{props.item.auction_endtime}</td>
			<td><button className="btn btn-danger"
				onClick={() => props.changeMode("cancel")}
			>Cancel</button></td>
			<td><button className="btn btn-success"
				onClick={() => props.removeItem(props.item._id)}
			>Confirm</button></td>
		</tr>	
	)
}

export default RemoveRow;