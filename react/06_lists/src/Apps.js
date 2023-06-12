import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
    const [state,setState] = useState({
        list:[],
        id:100
    })

    const addContact = (contact) => {
        setState((state) = (contact) => {
            contact.id =state.id;
            return {
                list:state.list.concat(contact),
                id:state.id+1
            }
        })
    }

    const removeContact = (id) => {
        setState((state) => {
            let tempList = state.list.filter(contact => contact.id !== id);
            return {
                ...state,
                list:tempList
            }
        })
    }

    return (
        <div className='App'>

        </div>
    )

}