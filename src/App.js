import { useEffect, useState } from 'react';
import './App.css';
import Pomodoro from './Pomodoro';

function App() {
const [onOff, setOnOff] = useState(false);




  return (
    <div className="App">
     
    <Pomodoro onOff={onOff}/>
    <button className='start_stop' onClick={() => setOnOff(!onOff)}>Start</button>
   
    </div>
  );
}

export default App;
