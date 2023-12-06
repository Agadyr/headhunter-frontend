'use client'

import {useState} from 'react'
export default function Test(){
    const [counter,  setCounter] = useState(10)
    const plusFunc = () =>{
        setCounter(counter + 1)
    }
    const minusFunc = () =>{
        setCounter(counter - 1)
    }
    return (<div>
        <h1>My test Component</h1>
        <p>My test paragraph</p>
        <a>Test Link</a>

        <p> Counter :{counter}</p>
        <button onClick={minusFunc}>Minus</button>
        <button onClick={plusFunc}>Plus</button>
</div>)
}