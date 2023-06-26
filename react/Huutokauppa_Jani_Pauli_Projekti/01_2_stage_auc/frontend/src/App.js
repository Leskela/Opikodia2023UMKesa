import {useState, useEffect} from 'react'
import NewAuctionForm from './components/newauctionform'
import AuctionsList from './components/auctionslist'



function App() { 
  const [state, setState] = useState({
    list:[]
  })
  const [urlRequest, setUrlRequest] = useState ({
    url:"",
    request:{},
    action:""
    
    })
    useEffect(() => {
      getList()
    }, [])



    useEffect(() => {
      const fetchData = async () => {
        if (!urlRequest.url) {
          return;
        }
    
        const response = await fetch(urlRequest.url, urlRequest.request);
        if (!response) {
          console.log("Eka response failed");
          return;
        }
        if (response.ok) {
          switch (urlRequest.action) {
            case "getlist":
              try {
                const data = await response.json();
                setState({
                  list: data,
                });
              } catch (error) {
                console.log("Error parsing response:", error);
              }
              return;
            case "addevent":
            default:
              return;
          }
        } else {
          console.log("Server responded with a status " + response.status + " " + response.statusText);
        }
      };
    
      fetchData();
    }, [urlRequest]);



// Actionit REST-käyttöön

const getList = () => {
  setUrlRequest({
    url:"/api/aucevents",
    request:{
      "method":"GET"
    },
    action:"getlist"			
  })
}

const addEvent = (auction) => {
  setUrlRequest({
    url:"/api/aucevents",
    request:{
      "method":"POST",
      "headers":{
        "Content-Type":"application/json"
      },
      "body":JSON.stringify(auction)
    },
    action:"addevent"
  })
}

  

return (
<div className="App">
<NewAuctionForm addEvent={addEvent}/>
<AuctionsList list={state.list} />


			

  
  </div>

)
}

export default App