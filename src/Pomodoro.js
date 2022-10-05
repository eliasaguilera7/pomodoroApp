import {useState, useEffect} from 'react';
import App from './App';

const Pomodoro = () => {
let interval;

const [onOff, setOnOff] = useState(false);
let [minutes, setMinutes] = useState(25);
let [seconds, setSeconds] = useState(0);
const [displayMessage, setDisplayMessage] = useState(false);
let [minutesFixed, setMinutesFixed] = useState(25);
let [breakTime, setBreakTime] = useState(5);
let [resetTime, setResetTime] = useState(false);
let [timerLabel, setTimerLabel] = useState('Session');

// Session Functions
let increaseMinutes = () => {
    if (onOff === false){
    
        if(minutesFixed < 60 && minutesFixed == minutes){
        minutes < 60 ? setMinutes(++minutes): setMinutes(60);  
        minutes < 60 ? setSeconds(0): setSeconds(0);
        }
       // minutes == 60 ? setSeconds(0): setSeconds(seconds);
        //minutesFixed < 60 ?setMinutesFixed(minutes-1):setMinutesFixed(minutesFixed);
        if (minutesFixed <60){
            minutes < 59  ? setMinutesFixed(++minutesFixed): setMinutesFixed(60);
            minutes < 59 ? setSeconds(0): setSeconds(0);
            minutes < 59 ? setMinutes(minutesFixed): setMinutes(60);
        }
        if (minutesFixed == 60){
            setMinutes(60);
            setSeconds(0);
        }       
        // minutes == 60 ? setSeconds(0): setSeconds(seconds);
    } 
}

let decreaseMinutes = () => {
    if (onOff === false){
    
    if(minutesFixed == minutes &&  minutes > 1){
    minutes > 0 ? setMinutes(--minutes): setMinutes(minutes);
    minutesFixed > 0 ? setMinutesFixed(--minutesFixed): setMinutesFixed(minutesFixed);
    }
    else if(minutes > 1) {
        minutesFixed > 0 ? setMinutesFixed(--minutesFixed): setMinutesFixed(minutesFixed);
        setMinutes(minutesFixed);
        setSeconds(0);
    }
    }
}

let resetMinutes =()=> {
        setOnOff(false); 
        clearInterval(interval)
        setMinutes(minutes = 25);  
        setMinutesFixed(25);
        setBreakTime(5);
        if(seconds !== 0){
        setSeconds(seconds = 0);
        setResetTime(true);
        setTimerLabel('Session');
     
        }
        let soundS = document.getElementById("beep");

        console.log(soundS.duration + ' this is the duration of the sound');
        console.log(soundS.load() + ' this is the duration of the sound');
  
        
 
}




// Breaks Functions
let breakIncrease = () =>{
    if(onOff === false){
    //breakTime == 60 && seconds > 0 ? 
    breakTime < 60  ? setBreakTime(++breakTime) : setBreakTime(breakTime);
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
                setDisplayMessage(!displayMessage);
                clearInterval(interval);
                console.log('********Display Message is *******'+ displayMessage );
                
                
               
                let minutes = displayMessage ? minutesFixed-1 : breakTime-1;
                displayMessage ? setTimerLabel('Session') : setTimerLabel('Break');
                let seconds = 59;
                setSeconds(seconds);
                setMinutes(minutes);
                

                }
        }    
            else { setSeconds(seconds - 1)}
            console.log('But what about here?');};
        
        },100)},[seconds, onOff]);

        // Reset Pomodoro functions

    if (minutes===24 && seconds===59 && resetMinutes === true){
        setMinutes(25);
        setSeconds(0);
    }  
    
    /* useEffect( ()=>{
    <audio controls id="beep" >
    <source src="./Ram_Bell_Sound.mp3" type="audio/mpeg"></source>
    </audio>
    },[timerLabel]);*/

    const playBeep = () => {
        let soundS = document.getElementById("beep");
        soundS.play();
        console.log(soundS); 
        console.log("Is changing to Session/Break");
    }


  
    

    if (minutes === 0 && seconds === 0){
        playBeep();
    }


    return ( 
        <div className="pomodoro">
            
            {console.log('Now Secons is: '+ seconds)}
            <h3 className='timer-label'>{timerLabel}</h3>
            <span id="time-left" className="minutes">{minutes}</span>:
            <span className="seconds">{seconds > 9 ? seconds : "0"+seconds}</span><br/>
            <button id='start_stop' onClick={() => setOnOff(!onOff)}>Start</button>

            {/*Session*/}
            <h2 id ="session-length"> <h2 id="session-label">Session Length:</h2>  {minutesFixed}</h2> 
            <button id="session-increment" onClick={increaseMinutes} >Session Increment</button>
            <button id="session-decrement" onClick={decreaseMinutes} >Session Decrement</button>  

            {/*Reset Seconds*/}
            <button id='reset' onClick={()=>{resetMinutes()}}>Reset</button>

            {/*Break*/}
            <h2 id="break-length"> <h2 id="break-label">Break Length:</h2>  {breakTime}</h2>
            <button id="break-increment" onClick={breakIncrease}>Break Increment</button>
            <button id="break-decrement" onClick={breakDecrease}>Break Decrement</button>         
            
            {console.log('now minute4s is ' + minutes)}

            <audio id="beep" controls hidden>
            <source src="./Ram_Bell_Sound.mp3" type="audio/mpeg"></source>
            </audio>

         
        </div>
     );
}
 
export default Pomodoro;

// Code for testing
//<h2>Switching: {minutesFixed}</h2>
// > 9 ? seconds : "0"+seconds