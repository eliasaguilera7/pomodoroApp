import {useState, useEffect} from 'react';
import App from './App';

const Pomodoro = ({onOff}) => {
console.log('But what about here?');
let [minutes, setMinutes] = useState(1);
const [seconds, setSeconds] = useState(0);
const [displayMessage, setDisplayMessage] = useState(true);
let [minutesFixed, setMinutesFixed] = useState(1);
let [breakTime, setBreakTime] = useState(5);

// Session Functions
let increaseMinutes = () => {
    minutes < 60 ? setMinutes(++minutes): setMinutes(minutes);
    minutesFixed < 60  ? setMinutesFixed(++minutesFixed): setMinutesFixed(minutesFixed);
}

let decreaseMinutes = () => {
    minutes > 0 ? setMinutes(--minutes): setMinutes(minutes);
    minutesFixed > 0 ? setMinutesFixed(--minutesFixed): setMinutesFixed(minutesFixed);
}

let resetMinutes =()=> {
    setMinutes(25)
}

// Breaks Functions
let breakIncrease = () =>{
    breakTime < 60 ? setBreakTime(++breakTime) : setBreakTime(breakTime);
}

let breakDecrease = () => {
    breakTime > 1 ? setBreakTime(--breakTime) : setBreakTime(breakTime);
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
                console.log('do you even get in here?');
                let minutes = displayMessage ? minutesFixed : breakTime;
                let seconds = 59;
                setSeconds(seconds);
                setMinutes(minutes);
                setDisplayMessage(!displayMessage);
                }
        }    
            else{setSeconds(seconds - 1) }};
        
        },150)},[seconds, onOff]);
        
    return ( 
        <div className="pomodoro">
            <span className="minutes">{minutes }</span>:
            <span className="seconds">{seconds > 9 ? seconds : "0"+seconds}</span><br/>
            <button onClick={increaseMinutes} >Increse Minutes</button>
            <button onClick={decreaseMinutes} >Decrease Minutes</button>
            <button className='reset' onClick={resetMinutes}>Reset</button>
            <button onClick={breakIncrease}>Break Increase</button>
            <button onClick={breakDecrease}>Break Decrease</button>
            <h1>Session Length: {minutesFixed}</h1>
      
            <h2>The Break Time is: {breakTime}</h2>

            {console.log('now minute4s is ' + minutes)}

        </div>
     );
}
 
export default Pomodoro;

// Code for testing
//<h2>Switching: {minutesFixed}</h2>
// > 9 ? seconds : "0"+seconds