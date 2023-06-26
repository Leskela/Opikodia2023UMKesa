import {useState} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


const NewAuctionForm = ({addEvent}) => {
    const initialState = {
      auction_name: '',
      auction_date_start:null,
      auction_date_end:null,
      auction_description: '',
      auction_address: '',
      auction_email: '',
      auction_phone: '',
    }

    const [state, setState] = useState(initialState)

    const handleChange = (event) => {
     
  
      setState((prevState) => ({
        ...prevState,
        [event.target.name]:event.target.value
            }));
    };

    const onDateChange = (date, field) => {
      setState((prevState) => ({
        ...prevState,
        [field]: date,
      }));
    };

      const onSubmit = (event) => {
        event.preventDefault()
        console.log(state);

        let errorText = "";

        if(state.auction_name === "") {
          errorText = "Tapahtuma nimi aikaa ei ole määritelty.";
        };

        if(state.auction_date_start === null) {
          errorText = errorText + "\n" + "Tapahtuma alkaa aikaa ei ole määritelty.";
        };

        if(state.auction_date_end === null) {
          errorText = errorText + "\n" + "Tapahtuma päättyy aikaa ei ole määritelty.";
        };

        if(state.auction_email === "") {
          errorText = errorText + "\n" + "Järjestäjän sähköpostiosoitetta ei ole määritelty.";
        };

        if(state.auction_phone === "") {
          errorText = errorText + "\n" + "Tapahtuman yhteysnumero ei ole määritelty.";
        };

        if(!(errorText === "")) {
          errorText = "Lisää seuraavat pakolliset tiedot:\n" + errorText;

          alert(errorText);
        } else {
          addEvent(state) //Tallenetaan annetut input kenttien arvot!
          setState(initialState) //Tyhjentää anetut input kenttien arvot!

          alert("Huutokaupan tiedot lisätty");
        }
      }



return (
    
	<div style={{
		"backgroundColor":"lightblue",
		"margin":"auto",
		"width":"70%",
		"textAlign":"center"
		
	}}>

<form className="mb-3" onSubmit={onSubmit}>
	<label htmlFor="auction_name" className="form-label"><b>Tapahtuman nimi</b></label>
	<input type="text"
    className="form-control"
    name="auction_name"
	id="auction_name" 
    onChange={handleChange}
	value={state.auction_name}/>

<label htmlFor="auction_date_start" className="form-label">
  <b>Tapahtuma alkaa</b>
</label>
<DatePicker
  className="form-control"
  selected={state.auction_date_start}
  onChange={(date) => onDateChange(date, "auction_date_start")}  
  dateFormat="dd/MM/yyyy HH:mm" 
  showTimeSelect 
  timeFormat="HH:mm" 
  timeIntervals={15} 
  name="auction_date_start"
  id="auction_date_start"
/>
<label htmlFor="auction_date_end" className="form-label">
  <b>Tapahtuma päättyy</b>
</label>
<DatePicker
  className="form-control"
  selected={state.auction_date_end}
  onChange={(date) => onDateChange(date, "auction_date_end")}
  dateFormat="dd/MM/yyyy HH:mm" 
  showTimeSelect 
  timeFormat="HH:mm" 
  timeIntervals={15} 
  name="auction_date_end"
  id="auction_date_end"
/>


<label htmlFor="auction_description" className="form-label"><b>Tapahtumatiedot</b></label>
        <textarea
          className="form-control"
          name="auction_description"
          id="auction_description"
          onChange={handleChange}
          value={state.auction_description}
        />

<label htmlFor="auction_address" className="form-label"><b>Osoite </b></label>
	<input type="text"
    className="form-control"
    name="auction_address"
	id="auction_address" 
    onChange={handleChange}
	value={state.auction_address}/>

<label htmlFor="auction_email" className="form-label"><b>Järjestäjän email </b></label>
	<input type="email"
    className="form-control"
    name="auction_email"
	id="auction_email" 
    onChange={handleChange}
	value={state.auction_email}/>

<label htmlFor="auction_phone" className="form-label"><b>Tapahtuman yhteysnumero </b></label>
	<input type="text"
    className="form-control"
    name="auction_phone"
	id="auction_phone" 
    onChange={handleChange}
	value={state.auction_phone}/>

<button type="submit" className="btn btn-primary">Tallenna ja jatka</button>

</form>

</div>

)}


export default NewAuctionForm