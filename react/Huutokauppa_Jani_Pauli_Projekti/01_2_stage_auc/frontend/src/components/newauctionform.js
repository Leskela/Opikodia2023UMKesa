import {useState, useEffect} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';


const NewAuctionForm = ({addEvent, mode, editauc, editEvent}) => {
    const initialState = {
      auction_name: '',
      auction_date_start:moment().toDate(),
      auction_date_end:moment().toDate(),
      auction_description: '',
      auction_address: '',
      auction_email: '',
      auction_phone: '',
    }

    const [state, setState] = useState(initialState)
    const [buttonState, setButtonState] = useState({
      buttonName:"Tallenna ja jatka"
    })

    useEffect(()=> {
      if(mode ==="edit"){
        setState({
          auction_name: editauc.auction_name,
          auction_date_start: moment(editauc.auction_date_start).toDate(),
          auction_date_end: moment(editauc.auction_date_end).toDate(),
          auction_description:editauc.auction_description,
          auction_address: editauc.auction_address,
          auction_email:editauc.auction_email,
          auction_phone: editauc.auction_phone
        })
        setButtonState({
          buttonName:"Hyväksy muutokset"
        })
      }
    }, [mode])
  

    const handleChange = (event) => {
     
  
      setState((prevState) => ({
        ...prevState,
        [event.target.name]:event.target.value
            }));
    };

    const onDateChange = (date, field) => {
      setState((prevState) => ({
        ...prevState,
        [field]: date ? moment(date).toDate() : null
      }));
    };

    const onSubmit = (event) => {
      event.preventDefault()
      console.log(state);

      let errorText = "";
      let errorDate = 0;

      if(state.auction_name === "") {
        errorText = "Tapahtuma nimi aikaa ei ole määritelty.";
      };

      if(state.auction_date_start === null) {
        errorDate = 1;
        errorText = errorText + "\n" + "Tapahtuma alkaa aikaa ei ole määritelty.";
      };

      if(state.auction_date_end === null) {
        errorDate = 1;
        errorText = errorText + "\n" + "Tapahtuma päättyy aikaa ei ole määritelty.";
      };

      if(errorDate === 0) {
        if(state.auction_date_start > state.auction_date_end) {
          errorText = errorText + "\n" + "Tapahtuma päättyy aika on pienempi kuin alkaa aika.";
        }
      }

      if(state.auction_email === "") {
        errorText = errorText + "\n" + "Järjestäjän sähköpostiosoitetta ei ole määritelty.";
      };

      if(state.auction_phone === "") {
        errorText = errorText + "\n" + "Tapahtuman yhteysnumero ei ole määritelty.";
      };

      if(!(errorText === "")) {
        errorText = "Korjaa seuraavat pakolliset tiedot:\n" + errorText;

        alert(errorText);
      } else {

        if(mode === "add"){
          addEvent(state) //Tallenetaan annetut input kenttien arvot!
        
          alert("Huutokaupan tiedot lisätty");
        }
        else {
          let auction = {
            ...state,
            _id:editauc._id
          }
          editEvent(auction)
          setButtonState({
            buttonName:"Tallenna ja jatka"
          })
          alert("Huutokaupan tiedot päivitetty");
        }

        setState(initialState) //Tyhjentää anetut input kenttien arvot!
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
  onChange={(date) =>
    onDateChange(date ? moment(date).toDate() : null, 'auction_date_start')
  }
  dateFormat="dd/MM/yyyy HH:mm"
  showTimeSelect
  timeFormat="HH:mm"
  timeIntervals={15}
  name="auction_date_start"
  id="auction_date_start"
/>

<label htmlFor="auction_date_start" className="form-label">
  <b>Tapahtuma päättyy</b>
</label>
<DatePicker
  className="form-control"
  selected={state.auction_date_end}
  onChange={(date) =>
    onDateChange(date ? moment(date).toDate() : null, 'auction_date_end')
  }
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

<button type="submit" className="btn btn-primary">{buttonState.buttonName}</button>

</form>

</div>

)}


export default NewAuctionForm