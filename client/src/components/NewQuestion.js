import React, { useState } from 'react'
import { post } from '../utilities'

const NewQuestion = (props) => {
    const [question, setQuestion] = useState('')

    const updateQuestion = (event) => {
        setQuestion(event.target.value)
    }

    const submitQuestion = () => {
        post('/api/question', {courseId: props.courseId, content: question})
        setQuestion('')
    }

    const enterQuestion = (event) => {
        if(event.key === 'Enter'){
            submitQuestion()
        }
    }

    return (
        <div>
            <input style={{width: '90%', borderColor: 'black'}} value={question} onChange={updateQuestion} 
            onKeyPress={enterQuestion} placeholder='Ask a Question...'/>
            <button onClick={submitQuestion}>Submit</button>
        </div>
        
    )
}

export default NewQuestion