import React, { useState } from 'react'
import { post } from '../utilities'

const NewAnswer = () => {
    const [answer, setAnswer] = useState('')

    const updateAnswer = (event) => {
        setAnswer(event.target.value)
    }

    const submitAnswer = () => {
        post('/api/answer', {answerTo: props.questionId, content: answer})
        setAnswer('')
    }

    const enterAnswer = (event) => {
        if(event.key === 'Enter'){
            submitAnswer()
        }
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', padding: '8px'}}>
            <input style={{width: '90%', borderColor: 'black'}} value={answer} onChange={updateAnswer} 
            onKeyPress={enterAnswer} placeholder='Submit an Answer...'/>
            <button onClick={submitAnswer}>Submit</button>
        </div>
        
    )
}

export default NewAnswer