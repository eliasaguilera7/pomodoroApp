import {useState, useEffect} from 'react';
import App from './App';

const Pomodoro = () => {
let interval;

const [onOff, setOnOff] = useState(false);
let [minutes, setMinutes] = useState(25);
let [seconds, setSeconds] = useState(0);
const [displayMessage, setDisplayMessage] = useState(true);
let [minutesFixed, setMinutesFixed] = useState(25);
let [breakTime, setBreakTime] = useState(5);
let [resetTime, setResetTime] = useState(false);



// Session Functions
let increaseMinutes = () => {
    if (onOff === false){
        minutes < 60 ? setMinutes(++minutes): setMinutes(minutes);
        minutesFixed < 60  ? setMinutesFixed(++minutesFixed): setMinutesFixed(minutesFixed);
    }
    
}

let decreaseMinutes = () => {
    if (onOff === false){
    minutes > 0 ? setMinutes(--minutes): setMinutes(minutes);
    minutesFixed > 0 ? setMinutesFixed(--minutesFixed): setMinutesFixed(minutesFixed);
    }
    
}

let resetMinutes =()=> {
        setOnOff(false); 
        clearInterval(interval)
        setMinutes(minutes = 25);  
        if(seconds !== 0){
        setSeconds(seconds = 0);
        }
        setResetTime(true);
 
}



// Breaks Functions
let breakIncrease = () =>{
    if(onOff === false){
    breakTime < 60 ? setBreakTime(++breakTime) : setBreakTime(breakTime);
    }
    
}

let breakDecrease = () => {
    if (onOff === false){
    breakTime > 1 ? setBreakTime(--breakTime) : setBreakTime(breakTime);
    } 
    
}

    useEffect(() => {
        console.log('SECONDS AFRTER CHANGE ARE: '+ seconds);
        console.log('onOff AFRTER CHANGE ARE: '+ onOff);

        interval = setInterval(()=>{
        if(onOff){
            clearInterval(interval)
            console.log('inside is ' + onOff);
            if (seconds === 0){
                if(minutes !== 0){   
                setSeconds(59) 
                setMinutes(minutes - 1);
                console.log('about fist?');
               
     
                }else {
                console.log('do you even get in here?');

                let minutes = displayMessage ? minutesFixed : breakTime;
                let seconds = 59;
                setSeconds(seconds);
                setMinutes(minutes);
                setDisplayMessage(!displayMessage);

                }
        }    
            else { setSeconds(seconds - 1)}
            console.log('But what about here?');};
        
        },1000)},[seconds, onOff]);

        // Reset Pomodoro functions

    if (minutes===24 && seconds===59 && resetMinutes === true){
        setMinutes(25);
        setSeconds(0);
    }    
    return ( 
        <div className="pomodoro">
            
            {console.log('Now Secons is: '+ seconds)}
            <h3 className='timer-label'>Session</h3>
            <span id="time-left" className="minutes">{minutes}</span>:
            <span className="seconds">{seconds > 9 ? seconds : "0"+seconds}</span><br/>
            <button className='start_stop' onClick={() => setOnOff(!onOff)}>Start</button>

            {/*Session*/}
            <h2 id ="session-label">Session Length: {minutesFixed}</h2> 
            <button id="session-increment" onClick={increaseMinutes} >Session Increment</button>
            <button id="session-decrement" onClick={decreaseMinutes} >Session Decrement</button>  

            {/*Reset Seconds*/}
            <button className='reset' onClick={()=>{resetMinutes()}}>Reset</button>

            {/*Break*/}
            <h2 id="break-label">Break Lenght: {breakTime}</h2>
            <button id="break-increment" onClick={breakIncrease}>Break Increment</button>
            <button id="break-decrement" onClick={breakDecrease}>Break Decrement</button>         
            
            {console.log('now minute4s is ' + minutes)}
          

        </div>
     );
}
 
export default Pomodoro;

// Code for testing
//<h2>Switching: {minutesFixed}</h2>
// > 9 ? seconds : "0"+seconds