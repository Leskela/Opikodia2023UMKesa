import React,{useState,useEffect} from 'react';

interface useState {
    seconds:number;
}
const StatefulComponent:React.FC<{}> = (props) => {


    const [state,setState] = useState<State>({
        seconds:0
    })

    const tick = () => {
        setState((state)) => {
            return {}
        }
    }
}