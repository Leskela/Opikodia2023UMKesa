import { useState } from 'react';
import AucRow from './aucrow';

const AuctionsList = (props) => {
  const [state, setState] = useState({
    list: [],
  });

  let auctionevents = props.list.map((aucevent, index) => {
    return (
      <AucRow key={aucevent._id} aucevent={aucevent} index={index} />
    );
  });

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