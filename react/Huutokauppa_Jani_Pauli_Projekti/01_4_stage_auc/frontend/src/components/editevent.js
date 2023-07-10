import {useState} from 'react'


const EditEvent =(props) => {

const [state, setState] = useState({
"auction_name":props.aucevent.auction_name,
"auction_date_start": props.aucevent.auction_date_start,
"auction_date_end": props.aucevent.auction_date_end,
"auction_descripton":props.aucevent.auction_description,
"auction_address":props.aucevent.auction_address,
"auction_email":props.aucevent.auction_email,
"auction_phone":props.aucevent.auction_phone

})

const handleChange =(event) => {
    const { name, value }=event.target
    setState((prevState)=>({
        ...prevState,
        [name]:value
    }))
}


const editEvent = () => {
    const aucevent = {
      ...state,
    _id: props.aucevent._id,
 
};
    props.editEvent(aucevent);
  };

return (

        <div style={{
          backgroundColor: 'lightblue',
          margin: 'auto',
          width: '70%',
          textAlign: 'center',
        }}>
          <form className="mb-3">
            <label htmlFor="auction_name" className="form-label">
              <b>Tapahtuman nimi</b>
            </label>
            <input
              type="text"
              className="form-control"
              name="auction_name"
              id="auction_name"
              onChange={handleChange}
              value={state.auction_name}
            />
      
            <label htmlFor="auction_description" className="form-label">
              <b>Tapahtumatiedot</b>
            </label>
            <textarea
              className="form-control"
              name="auction_description"
              id="auction_description"
              onChange={handleChange}
              value={state.auction_description}
            />
      
            <label htmlFor="auction_address" className="form-label">
              <b>Osoite</b>
            </label>
            <input
              type="text"
              className="form-control"
              name="auction_address"
              id="auction_address"
              onChange={handleChange}
              value={state.auction_address}
            />
      
            <label htmlFor="auction_email" className="form-label">
              <b>Järjestäjän email</b>
            </label>
            <input
              type="email"
              className="form-control"
              name="auction_email"
              id="auction_email"
              onChange={handleChange}
              value={state.auction_email}
            />
      
            <label htmlFor="auction_phone" className="form-label">
              <b>Tapahtuman yhteysnumero</b>
            </label>
            <input
              type="text"
              className="form-control"
              name="auction_phone"
              id="auction_phone"
              onChange={handleChange}
              value={state.auction_phone}
            />
      
            
      
          </form>
          <button className="btn btn-primary" onClick={editEvent}>
            Edit Event
          </button>
        </div>
      
      
)




}


export default EditEvent



