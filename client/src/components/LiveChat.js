import React, { useEffect, useState } from 'react'
import { get, post } from "../utilities";

import SingleQuestion from './SingleQuestion.js'
import NewQuestion from './NewQuestion.js'

const LiveChat = (props) => {
    const [questionsList, setQuestionsList] = useState([])

    useEffect(() => {
        get('/api/getQuestions', {courseId: props.courseId}).then((questions) => {
            setQuestionsList(questions)
        })
    }, [questions])
    console.log(questionsList)
    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'center', padding: '8px'}}>
                <NewQuestion courseId={props.courseId}/>
            </div>
            <div>
                <SingleQuestion />
                <SingleQuestion />
                <SingleQuestion />
                <SingleQuestion />
                <SingleQuestion />
                <SingleQuestion />
                <SingleQuestion />
                <SingleQuestion />
                <SingleQuestion />
                <SingleQuestion />
                <SingleQuestion />
            </div>
        </div>
    )
}

export default LiveChat