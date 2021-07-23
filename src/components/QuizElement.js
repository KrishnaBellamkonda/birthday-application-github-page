import React from 'react';
import { useState, useEffect } from 'react';


// Split the user Input 
function splitUserInput(value){
    const splitArray = value.split("-");
    console.log(splitArray)
    return [parseInt(splitArray[2]), parseInt(splitArray[1])];
}


const QuizElement = (props)=>{

    // Constants 
    const name = props.name;
    const id = props.id;
    const year = props.year;
    const idGenerator = props.idGenerator;
    const answer = props.answer;
    const dipatchFunction = props.dispatchFunction;
    const isTrue = props.isTrue;
    const submit = props.submit;
    
    // Answer Wrangling
    const answerSplitArray = answer.split('/');
    const answerDate = parseInt(answerSplitArray[0]);
    const answerMonth = parseInt(answerSplitArray[1]); 
    console.log(answer, "day:", answerDate,"month:", answerMonth )
    // Values 
    const inputIds = idGenerator();
    const inputId = inputIds.next().value;

    // Date 
    const minYear = `${year}-01-01`;
    const maxYear = `${year}-12-31`;

    // onEventHandler 
    function onUserInputHandler(e){
        const userInput = e.target.value;
        const [day, month] = splitUserInput(userInput);
        console.log(day, month)
        if(day === answerDate && month === answerMonth){
            dipatchFunction({type:name, payload:{value:true}})
        } else {
            dipatchFunction({type:name, payload:{value:false}})
        }

    }

    if(isTrue&&submit){
        // console.log(name)
    }

    // Return classnames 
    function returnRightClassNames(isTrue, submit){
        if(!submit) return "quiz-element";
        if(isTrue && submit) return "quiz-element right"
        else return "quiz-element wrong"
    }


    return (
        <div 
        className={returnRightClassNames(isTrue, submit)} 
        
        id={id}>
            <label htmlFor={inputId}>{name}</label>
            <input 
            type="date" 
            max={maxYear}
            min={minYear}
            onChange={onUserInputHandler}
            id={inputId}         
            placeholder={minYear}
            />
        {(!isTrue && submit)?<p>{answerDate}/{answerMonth}</p>:null}    
        </div>
    )
}

export default QuizElement;