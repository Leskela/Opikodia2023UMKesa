const Row = (props) => {

    return (
        //Sopping list tulostus!
        <tr>
            <td>{props.item.type}</td>
            <td>{props.item.count}</td>
            <td>{props.item.price}</td>
			<td>{props.item.auction_name}</td>
			<td>{props.item.auction_starttime}</td>
			<td>{props.item.auction_endtime}</td>
           <td><button className="btn btn-danger"
                onClick={() => props.changeMode("remove",props.index)}
            >Remove</button></td>
            <td><button className="btn btn-secondary"
                onClick={() => props.changeMode("edit",props.index)}
            >Edit</button></td>
        </tr>
    )
}

export default Row;