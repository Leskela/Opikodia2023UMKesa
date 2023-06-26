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
</tr>

    )
}

export default AucRow






