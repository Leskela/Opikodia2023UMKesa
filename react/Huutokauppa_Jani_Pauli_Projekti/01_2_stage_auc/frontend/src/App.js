import {useState, useEffect} from 'react'
import NewAuctionForm from './components/newauctionform'
import AuctionsList from './components/auctionslist'



function App() { 
  const [state, setState] = useState({
    list:[],
    mode:"add",
    editauc:{}
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
                setState((state)=> {
                  return{
                    ...state,
                    list:data
                  }
                  
                });
              } catch (error) {
                console.log("Error parsing response:", error);
              }
              return;
            case "addevent":
              getList()
              return
              case "removeevent":
                getList()
                return
                case "editevent":
                  getList()
                  setState((state)=> {
                    return{
                      ...state,
                      mode:"add",
                      editauc:{}
                    }
                  })

                return
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


const removeEvent = (id) => {
  setUrlRequest({
    url:"/api/aucevents/"+id,
    request:{
      "method":"DELETE"
    },
    action:"removeevent"
  })
}

const changeToEditMode =(editauc) => {
  setState((state)=> {
    return {
      ...state,
      mode:"edit",
      editauc:editauc
    }
  })
}

const editEvent = (auction) => {
  setUrlRequest({
    url:"/api/aucevents/"+auction._id,
    request:{
      "method":"PUT",
      "headers":{
        "Content-type":"application/json"
      },
      "body":JSON.stringify(auction)
    },
    action:"editevent"
  })
}


  

return (
<div className="App">
<NewAuctionForm addEvent={addEvent} mode={state.mode} editauc={state.editauc} editEvent={editEvent}  />
<AuctionsList list={state.list} removeEvent={removeEvent} changeToEditMode={changeToEditMode} />

  
  </div>

)
}

export default App