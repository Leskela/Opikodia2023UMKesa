import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';


const NewAuctionForm = ({ addEvent, mode, editauc, editEvent }) => {
  const initialState = {
    auction_name: '',
    auction_date_start: '',
    auction_date_end: '',
    auction_description: '',
    auction_address: '',
    auction_email: '',
    auction_phone: '',
  }

  const [state, setState] = useState(initialState)
  const [buttonState, setButtonState] = useState({
    buttonName: "Tallenna ja jatka"
  })

  const convertToGBTime = (timeString) => {
    const helsinkiTime = moment.tz(timeString, 'eg-GB');
    return helsinkiTime.format('YYYY-MM-DD HH:mm:ss');
  };

  useEffect(() => {
    console.log("##24 mode", mode)
    if (mode === "edit") {
      console.log("##26 NAF editauc.auction_date_start", editauc.auction_date_start) //auction_date_end: "Invalid Date"
      console.log("##27 NAF editauc", editauc)
      // console.log("##28 NAF moment.tz.setDefault(editauc.auction_date_start)", moment.tz.setDefault(editauc.auction_date_start))
      // var testiTime = moment.tz.setDefault(editauc.auction_date_start)
      // console.log("##30 NAF testiTime", testiTime)
      // console.log("##31 NAF moment.tz.names();", moment.tz.names())
      // console.log("##37 NAF convertToGBTime", convertToGBTime(editauc.auction_date_start))
      // var GBStartTime = convertToGBTime(editauc.auction_date_start);
      // var GBSEndTime = convertToGBTime(editauc.auction_date_end);
      // new Date(GBTime);
      // Date.parse(GBTime);
      // GBTime = GBTime.parseISO.auction_date_start 
      // console.log("##39 NAF GBStartTime", GBStartTime)
      // console.log("##39 NAF GBSEndTime", GBSEndTime)

      setState({
        auction_name: editauc.auction_name,
        // auction_date_start: editauc.auction_date_start,
        // auction_date_start: moment.tz.setDefault(editauc.auction_date_start),
        //  auction_date_start: convertToGBTime(editauc.auction_date_start),
        // auction_date_start: GBTime,
        // auction_date_start: editauc.auction_date_start,
        // auction_date_end: editauc.auction_date_end,
        // auction_date_start: moment(GBTime).toDate(), //Selvitä miten päivämäärän voi korjata!
        // auction_date_start: moment(GBTime).toDate(), //Selvitä miten päivämäärän voi korjata!
        auction_date_start: moment(editauc.auction_date_start).toDate(), //Selvitä miten päivämäärän voi korjata!
        auction_date_end: moment(editauc.auction_date_end).toDate(), //Selvitä miten päivämäärän voi korjata!
        auction_description: editauc.auction_description,
        auction_address: editauc.auction_address,
        auction_email: editauc.auction_email,
        auction_phone: editauc.auction_phone
      })
      setButtonState({
        buttonName: "Hyväksy muutokset"
      })
    } 
  }, [mode])

  console.log("##68 AF mode", mode)

  const handleChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  console.log("##77 AF mode", mode)

  const onDateChange = (date, field) => {
    setState((prevState) => ({
      ...prevState,
      [field]: date ? moment(date).toDate() : null
    }));
  };

  // console.log("##86 event", event)
  console.log("##87 AF state", state)

  const onSubmit = (event) => {
    event.preventDefault()

    console.log("##93event", event)

    let errorText = "";
    let errorDate = 0;
  
    if (state.auction_name === "") {
      errorText = "Tapahtuma nimi ei ole määritelty.";
    };

    if (state.auction_date_start === "") {
      errorDate = 1;
      errorText = errorText + "\n" + "Tapahtuma alkaa aikaa ei ole määritelty.";
    };

    if (state.auction_date_end === "") {
      errorDate = 1;
      errorText = errorText + "\n" + "Tapahtuma päättyy aikaa ei ole määritelty.";
    };

    if (errorDate === 0) {
      if (state.auction_date_start > state.auction_date_end) {
        errorText = errorText + "\n" + "Tapahtuma päättyy aika on pienempi kuin alkaa aika.";
      }
    }

    if (state.auction_email === "") {
      errorText = errorText + "\n" + "Järjestäjän sähköpostiosoitetta ei ole määritelty.";
    };

    if (state.auction_phone === "") {
      errorText = errorText + "\n" + "Tapahtuman yhteysnumero ei ole määritelty.";
    };

    if (!(errorText === "")) {
      errorText = "Korjaa seuraavat pakolliset tiedot:\n" + errorText;

      alert(errorText);
    } else {
      // ***** Tulaan linkin kautta tälle sivulle, niin mode arvoa ei ole määritelty. Pitää korjta! *****
      if (mode === "add" | typeof mode === 'undefined') {
        addEvent(state) //Tallenetaan annetut input kenttien arvot!

        alert("Huutokaupan tiedot lisätty");
      }
      else {
        let auction = {
          ...state,
          _id: editauc._id
        }
        editEvent(auction)
        setButtonState({
          buttonName: "Tallenna ja jatka"
        })
        alert("Huutokaupan tiedot päivitetty");
      }

      setState(initialState) //Tyhjentää anetut input kenttien arvot!
    }
  }

  console.log("##151 AF state", state)


  return (
    <div style={{
      "backgroundColor": "lightblue",
      "margin": "auto",
      "width": "70%",
      "textAlign": "center"

    }}>

      <form className="mb-3" onSubmit={onSubmit}>
        <label htmlFor="auction_name" className="form-label"><b>Tapahtuman nimi</b></label>
        <input type="text"
          className="form-control"
          name="auction_name"
          id="auction_name"
          onChange={handleChange}
          value={state.auction_name} />

        <label htmlFor="auction_date_start" className="form-label">
          <b>Tapahtuma alkaa</b>
        </label>
        <DatePicker
          className="form-control"
          selected={state.auction_date_start}
          onChange={(date) =>
            onDateChange(date ? moment(date).toDate() : null, 'auction_date_start')
          }
          // dateFormat="dd/MM/yyyy HH:mm"
          dateFormat="dd.MM.yyyy HH:mm"
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
          // dateFormat="dd/MM/yyyy HH:mm"
          dateFormat="dd.MM.yyyy HH:mm"
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
          value={state.auction_address} />

        <label htmlFor="auction_email" className="form-label"><b>Järjestäjän email </b></label>
        <input type="email"
          className="form-control"
          name="auction_email"
          id="auction_email"
          onChange={handleChange}
          value={state.auction_email} />

        <label htmlFor="auction_phone" className="form-label"><b>Tapahtuman yhteysnumero </b></label>
        <input type="text"
          className="form-control"
          name="auction_phone"
          id="auction_phone"
          onChange={handleChange}
          value={state.auction_phone} />

        <button type="submit" className="btn btn-primary">{buttonState.buttonName}</button>

      </form>

    </div>

  )
}


export default NewAuctionForm