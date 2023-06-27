const RemoveEvent =(props) => {
    const removeEvent = props.removeEvent
    return (
        <tr>
            <td>{props.aucevent.auction_name}</td>
            <td>{props.aucevent.auction_date_start}</td>
            <td>{props.aucevent.auction_date_end}</td>
            <td>{props.aucevent.auction_description}</td>
            <td>{props.aucevent.auction_address}</td>
            <td>{props.aucevent.auction_email}</td>
            <td>{props.aucevent.auction_phone}</td>
            <td><button className="btn btn-danger"
				onClick={() => props.changeMode("cancel")}
			>Cancel</button></td>

            <td><button className="btn btn-success"
            onClick={()=> removeEvent(props.aucevent._id)}>Delete</button>
            </td>      
            </tr>
    )
}

export default RemoveEvent