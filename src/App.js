// Application 
// 1) Birthday Remainder 
// 2) Quiz 

import React from 'react';
import { useState, useEffect } from 'react';
import BirthdayReminder from './components/BirthdayReminder';
import QuizSection from './components/QuizSection';
import {ReactComponent as Bulb} from './images/light-bulb-svgrepo-com.svg';

// Importing the constants 
import {rememberBirthdays, allBirthdays} from './quizConstants';

function App() {

  // Default is Dark Mode
  const [mode, setMode] = useState(true);
  function modeChangeHandler(e){
    setMode(old=>!old);
  }

  useEffect(()=>{console.log(mode)}, [mode])

  return (
    <div className={mode?"App":"App light-mode"}>
        <nav className="bg-surface-color">
            <div className="container">
              <div className="nav-box">
                <h1>Wish em'All</h1>
                <ul className="nav-links">
                  <li><a href="#reminder-section">Reminder</a></li>
                  <li><a href="#quiz-section">Quiz</a></li>
                  <li className="mode-button" onClick={modeChangeHandler}>
                    <Bulb className="bulb"/>
                  </li>
                </ul>
              </div>
            </div>

        </nav>
        <BirthdayReminder 
        allBirthdays={allBirthdays}
        />
        <QuizSection 
        rememberBirthdays = {rememberBirthdays}
        />
    </div>
  );
}

export default App;
