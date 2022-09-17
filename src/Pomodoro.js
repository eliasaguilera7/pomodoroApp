import {useState, useEffect} from 'react';
import App from './App';

const Pomodoro = ({onOff}) => {
console.log('But what about here?');
let [minutes, setMinutes] = useState(1);
const [seconds, setSeconds] = useState(59);
const [displayMessage, setDisplayMessage] = useState(true);

let increaseMinutes = () => {
    minutes < 60 ? setMinutes(++minutes): setMinutes(minutes);
}

let decreaseMinutes = () => {
    minutes > 0 ? setMinutes(--minutes): setMinutes(minutes);
}

let resetMinutes =()=> {
    setMinutes(25)
}



    useEffect(() => {

        let interval = setInterval(()=>{
        if(onOff){
            clearInterval(interval)
            if (seconds === 0){
                if(minutes !== 0){
                setSeconds(59);
                setMinutes(minutes - 1);    
                }else{
                let minutes = displayMessage ? 24 : 5;
                let seconds = 59;
                setSeconds(seconds);
                setMinutes(minutes);
                setDisplayMessage(!displayMessage);
                }
        }    
            else{setSeconds(seconds - 1)}};
        
        },150)},[seconds, onOff]);
        
    return ( 
        <div className="pomodoro">
            <span className="minutes">{minutes}</span>:
            <span className="seconds">{seconds}</span><br/>
            <button onClick={increaseMinutes} >Increse Minutes</button>
            <button onClick={decreaseMinutes} >Decrease Minutes</button>
            <button className='reset' onClick={resetMinutes}>Reset</button>
            <h1>{minutes}</h1>
            {console.log('now minute4s is ' + minutes)}

        </div>
     );
}
 
export default Pomodoro;
