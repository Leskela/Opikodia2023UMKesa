import AucPubRow from './aucpubrow';
import moment from 'moment';
import 'moment-timezone';

const AuctionsList = (props) => {
  // const convertToHelsinkiTime = (timeString) => {
  //   const helsinkiTime = moment.tz(timeString, 'Europe/Helsinki');
  //   return helsinkiTime.format('YYYY-MM-DD HH:mm:ss');
  // };

  const convertToHelsinkiTime = (timeString) => {
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

    return (
      <AucPubRow key={aucevent._id} aucevent={{ ...aucevent, auction_date_start: convertedStartTime, auction_date_end: convertedEndTime }} />
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