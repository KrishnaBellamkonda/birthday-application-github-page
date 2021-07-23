import React from "react";
import { useRef, useState } from "react";
function dateToTextFormat(date){
    const splitArray = date.split("/");
    const DATE = new Date(splitArray[2], splitArray[1]-1, splitArray[0]);
    const TODAY = Date.now()
    const timeDeltaInDays = Math.floor((DATE - TODAY)/(1000*60*60*24))


    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(DATE);
    let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(DATE);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(DATE);
    console.log(`${da}-${mo}-${ye}`);
    return [`${da}-${mo}-${ye}`, timeDeltaInDays]
}


const BirthdayReminderElement= (props)=>{
    // Data 
    const name = props.name;
    const date = props.date;
    // Get in formated Structure 
    const [dateInEnglish, daysRemaining] =  dateToTextFormat(date);
    
    // Refs & State
    const [clipboard, setClipboard] = useState(false);
    const focusRef = useRef();
    // Handler 
    function clipboardChangeHandler(e){
        setClipboard(old=>!old);
        focusRef.current.focus()
    }

    return (
        <article 
        className={clipboard?"birthday-reminder-element clipboard":"birthday-reminder-element"}  
        onDoubleClick={clipboardChangeHandler} 
        ref = {focusRef}
        >
            <div className="element-header">
                <h4>{name}</h4>
                <p>{dateInEnglish}</p>
            </div>
            <p>{daysRemaining} days remaining</p>
        </article>
        
    )
}

export default BirthdayReminderElement;