const AucRow = (props) => {
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
            onClick={() => props.changeMode("remove", props.index)}>Poista
            </button></td>

            <td><button className="btn btn-secondary"
            onClick={()=>props.editEvent(props.aucevent)}>Muokkaa
            </button></td>
</tr>

    )
}

export default AucRow
