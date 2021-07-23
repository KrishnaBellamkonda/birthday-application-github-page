import React from 'react';
import { useState, useReducer, useEffect, useRef } from 'react';

// Import Quiz element 
import QuizElement from './QuizElement';
import './style/quizSection.css';

// Import the required files 

// Constants 
const date = new Date();
const year = date.getFullYear();

// ACTIONS 
const ACTIONS = {
    reset:"RESET", 
    submit:"SUBMIT"
}


// Reducers
function reducer(state, action){
    switch(action.type){
        case ACTIONS.reset:
            return resetStateHandler(state, action);
        case ACTIONS.submit:
            return submitStateHandler(state, action);
        default:
            return updateStateHandler(state, action)

    }
}

// State Handler
function updateStateHandler(state, action){
    let newState = {...state};
    newState.boolState[action.type] = action.payload.value;
    // Update the Count 
    const boolValues = Object.values(newState.boolState);
    const trueValues = boolValues.filter(item=> item);
    const updatedCount=  trueValues.length;
    newState.count = updatedCount;
    console.log(updatedCount);
    return newState;

}

function resetStateHandler(state, action){
    let newState = {...state};
    let keys = Object.keys(newState.boolState);
    keys.forEach(item=>{
        newState.boolState[item] = false
    })

    // Reset count 
    newState.count = 0;
    // Reset score 
    newState.submit = false;
    return newState
}

function submitStateHandler(state, action){
    let newState = {...state, submit:true};
    return newState
}
// Generator Function 
function* idGenerator () {
    let iterationStart = 0;
    while(true){
        iterationStart++;
        yield iterationStart;
    }
} 


// Utility function 
function randomIndexGenerator(max, n_items = false, min = 0, ){
    if(!n_items){
        n_items = max;
    }
    
    let randomIndices = [];
    while(randomIndices.length !== n_items){
        let randomNumber = Math.floor(Math.random()*(max-min) + min);
        if(!(randomIndices.includes(randomNumber))){
            randomIndices.push(randomNumber)
        }
    }

    return randomIndices
    
}

function returnShuffledArrays(keys, answers){
    const shuffledIndices = randomIndexGenerator(keys.length);
    let shuffledKeys = [], shuffledAnswers = [];
    shuffledIndices.forEach(index=>{
        shuffledKeys.push(keys[index]);
        shuffledAnswers.push(answers[index]);
    })
    return [shuffledKeys, shuffledAnswers];
}



const QuizSection = (props)=>{

    // Birthdays List
    const rememberBirthdays = props.rememberBirthdays;

    // Id Generator
    const ids = idGenerator();

    // Arrays
    let names = Object.keys(rememberBirthdays);
    let answers = Object.values(rememberBirthdays);
    [names, answers] = returnShuffledArrays(names, answers);

    // Refs
    const namesRef = useRef(names);
    const answersRef = useRef(answers) 


    useEffect(()=>{
        // Arrays
    }, [])


    // Count State 
    const booleanStateConstant = {};
    names.forEach((item)=>{
        booleanStateConstant[item]=false;
    })

    const [state, dispatch] =  useReducer(reducer, {boolState: booleanStateConstant, count:0, submit:false});
    const [renderCount, setRenderCount] = useState(0);
    
    // Update Count 
    useEffect(() => {
        console.log(state)
        
    }, [state])

    // Handlers 
    function retryHandler(e){
        // e.target.preventDefault();
        console.log("Retrying")
        // Update the current ref
        let [newNames, newAnswers] = returnShuffledArrays(names, answers);
        namesRef.current = newNames;
        answersRef.current = newAnswers;
        setRenderCount(old=>old+1);
        dispatch({type:ACTIONS.reset})
    }

    function submitHandler(e){
        dispatch({type:ACTIONS.submit});
    }

    return (
        <section className='quiz-section section-module container'
        id="quiz-section"
        >
            <h2>Quiz Section</h2>
            {state.submit ? <div className="score-card">
                <h3>Score: {state.count}/{Object.keys(state.boolState).length}</h3>
            </div>:null
            }
            <form className="quiz-section-form">
                {
                    (namesRef.current).map((item, index)=>(
                        <QuizElement 
                        name = {item}
                        id = {ids.next().value}
                        year = {year}
                        idGenerator = {idGenerator}
                        answer = {(answersRef.current)[index]}
                        dispatchFunction = {dispatch}
                        submit = {state.submit}
                        isTrue = {state.boolState[item]}
                        />
                    ))
                }

            </form>

            <div className="buttons">
                    <a href="#quiz-section-answers">
                        <input type="button" id="quiz-section-submit" value="Submit" onClick={submitHandler} />
                    </a>

                    <a href="#retry">
                        <input type="button" id="quiz-section-retry" value="Retry" onClick={retryHandler}/>
                    </a>
            </div>
        
        </section>
    )
}

export default QuizSection;