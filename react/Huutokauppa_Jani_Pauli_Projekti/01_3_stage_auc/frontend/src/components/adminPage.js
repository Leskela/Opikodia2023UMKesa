import React from 'react';
import AuctionsList from './auctionslist';
import NewAuctionForm from './newauctionform';

const AdminPage = (props) => {
  return (
    <div>
      <NewAuctionForm addEvent={props.addEvent} mode={props.mode} editauc={props.editauc} editEvent={props.editEvent}  />
      <AuctionsList list={props.list} removeEvent={props.removeEvent} changeToEditMode={props.changeToEditMode} />
    </div>
)
}

export default AdminPage;