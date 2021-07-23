import React from 'react';
import BirthdayReminderElement from './BirthdayReminderElement';
import {useState, useEffect} from 'react';
// Create a simple quizzer 
// Reminder Section 
    // Display the birthdays coming in two weeks 

// Utility functions
function parseIntoDate(birthdayObj){
    const names = Object.keys(birthdayObj);
    const dates = Object.values(birthdayObj);
    let parsedValues = [];
    // Consider this year 
    const todayYear = new Date().getFullYear()
    dates.forEach((item, index)=>{
        let parsedDate;
        if(item){
            const splitArray = item.split('/');
            const date = splitArray[0], month = splitArray[1], year = splitArray[2];
            parsedDate = new Date(todayYear, month-1, date)
        } else {
            parsedDate = ""
        }

        parsedValues.push(parsedDate)
    })
    return [names, parsedValues]
}

function humanReadbleDates(date){
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${day}/${month+1}/${year}`
}

function getUpcomingBirthdays(birthdayObj, tolerance=28){
    const today = Date.now();
    const [names, parseDates] = parseIntoDate(birthdayObj);
    let upcomingBirthdays = {};
    // Filter Dates
    parseDates.forEach((item, index)=>{
        if(item){
            let timeDelta = item - today;
            let daysDelta = Math.floor(timeDelta/(1000*60*60*24));
            if ((daysDelta >= 0) && (daysDelta <= tolerance)){
                upcomingBirthdays[names[index]] = humanReadbleDates(item);
                
            }
        } 
        
    })

    return (upcomingBirthdays)


}

function argsort(array) {
    const arrayObject = array.map((value, idx) => { return { value, idx }; });
    arrayObject.sort((a, b) => {

        if (a.value < b.value) {

            return -1;

        }

        if (a.value > b.value) {

            return 1;

        }

        return 0;

    });

    const argIndices = arrayObject.map(data => data.idx);

    return argIndices;
 }

function getSortedBirthdays(upcomingObj){
    const today = Date.now();
    const [names, dates] = parseIntoDate(upcomingObj);
    const timeDeltas = [];
    dates.forEach((item)=>{
        const timeDelta = item - today;
        timeDeltas.push(timeDelta)
    })

    const argIndices = argsort(timeDeltas);
    // Sorted Indices 
    let sorted_names = [], sorted_dates = [];
    argIndices.forEach((sort_index)=>{
        sorted_names.push(names[sort_index]);
        sorted_dates.push(humanReadbleDates(dates[sort_index]))
    })

    // sorted_names.forEach((item, index)=>{
    //     console.log(item, sorted_dates[index])
    // })
    console.log(sorted_names, sorted_dates)
    return [sorted_names, sorted_dates]
}



const BirthdayReminder = (props)=>{

    // State 
    const [upcomingDays, setUpcomingDays] = useState(28);

    // Get the data 
    const allBirthdays = props.allBirthdays;

    // Getting the names of those whose birthday is approaching 
    const upcomingBirthdays = getUpcomingBirthdays(allBirthdays, upcomingDays)

    // Sorted arrays 

    const [sortedBirthdaysNames, sortedBirthdaysDates] = getSortedBirthdays(upcomingBirthdays);
    const nBirthdaysComing = sortedBirthdaysDates.length;


    // Handle 
    function upcomingDaysChange(e){
        const target = e.target.value;
        setUpcomingDays(target)

    }

    return (
        <section className="birthday-reminder section-module container"
        id="reminder-section"
        >

            <h2>Reminder Section</h2>
            
            <div className="reminder-input">
                <label htmlFor="reminder-section-n-days-ahead">Days ahead</label>
                <input id="reminder-section-n-days-ahead" type="number"  min = "1" max="365" step="1"
                onChange={upcomingDaysChange}
                placeholder = "28"
                />
            </div>

            <section className="upcoming-birthdays">
                {/* <h3>Upcoming Birthdays</h3> */}
                <h3 className="upcoming-birthdays-h4">Birthdays Coming Up - {nBirthdaysComing} </h3>
                <div className="table">

                    {
                    sortedBirthdaysNames.map((item, index)=>{
                        return (
                            <BirthdayReminderElement 
                            name = {item}
                            date= {sortedBirthdaysDates[index]}
                            />
                        )
                    })
                    }

                </div>
                
            
            </section>
            
            
        </section>
    )
}

export default BirthdayReminder;