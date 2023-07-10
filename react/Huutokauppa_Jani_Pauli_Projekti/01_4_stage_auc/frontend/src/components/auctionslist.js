import { useState } from 'react';
import AucRow from './aucrow';
import RemoveEvent from './removeevent';
import EditEvent from './editevent';
import moment from 'moment';
import 'moment-timezone';

const AuctionsList = (props) => {
  const [state, setState] = useState({
    removeIndex: -1,
    editIndex: -1
  })

  const changeMode = (mode, index) => {
    if (mode === "remove") {
      setState({
        removeIndex: index,
        editIndex: -1
      })
    }

    if (mode === "edit") {
      setState({
        removeIndex: -1,
        editIndex: index
      })
    }


    if (mode === "cancel") {
      setState({
        removeIndex: -1
      })
    }
  }

  const removeEvent = (id) => {
    props.removeEvent(id)
    changeMode("cancel")
  }

  const editEvent = (aucevent) => {
    props.changeToEditMode(aucevent)
    changeMode("cancel")
  }

  const convertToHelsinkiTime = (timeString) => {
    const helsinkiTime = moment.tz(timeString, 'Europe/Helsinki');
    return helsinkiTime.format('YYYY-MM-DD HH:mm:ss');
  };

  const convertToHelsinkiTime2 = (timeString) => {
    const helsinkiTime = new Date(timeString);
    
    const options = {
      day:'2-digit',
      month:'2-digit',
      year: 'numeric',
      hour:'2-digit',
      minute:'2-digit',
      timeZone: 'Europe/Helsinki'
    };

    return helsinkiTime.toLocaleDateString("eg-GB", options);
  };

  let auctionevents = props.list.map((aucevent, index) => {
    const convertedStartTime = convertToHelsinkiTime(aucevent.auction_date_start);
    const convertedEndTime = convertToHelsinkiTime(aucevent.auction_date_end);
    
    // console.log("##71 convertedStartTime", convertedStartTime)
    // console.log("##72 aucevent", aucevent)
    
    if (index === state.removeIndex) {
      return (
        <RemoveEvent key={aucevent._id} aucevent={aucevent} changeMode={changeMode} removeEvent={removeEvent} editEvent={editEvent} />
      )
    }
    if (index === state.editIndex) {
      return (
        <EditEvent key={aucevent._id} aucevent={aucevent} changeMode={changeMode} editEvent={editEvent} />
      )
    }

    return (
      <AucRow key={aucevent._id} aucevent={{ ...aucevent, auction_date_start: convertedStartTime, auction_date_end: convertedEndTime }} index={index} changeMode={changeMode} editEvent={editEvent} />
    )
  })


  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Mitä ja missä</th>
          <th>Alkaa</th>
          <th>Loppuu</th>
          <th>Tarjolla</th>
          <th>Osoite</th>
          <th>YhteysMaili</th>
          <th>Puhelin</th>
        </tr>
      </thead>
      <tbody>
        {auctionevents}
      </tbody>
    </table>
  );
};

export default AuctionsList;