import React, { useState } from 'react'
import SingleAnswer from './SingleAnswer'
import NewAnswer from './NewAnswer.js'

const SingleQuestion = (props) => {
    const [showAnswers, setShowAnswers] = useState(false)
    const [answersList, setAnswersList] = useState([])

    useEffect(() => {
        get('/api/answers', {courseId: props.courseId, answerTo: props.questionId}).then((answers) => {
            setAnswers(answers)
        })
    }, [answersList])

    const revealAnswers = () => {
        showAnswers ? (
            setShowAnswers(false)
        ) : (setShowAnswers(true))
    }

    return (
        <div>
            <div style={{backgroundColor: '#7a9cc6'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', color: 'white', padding: '8px'}}>
                    Q: {props.question}
                    
                    <button style={{justifySelf: 'right', alignSelf: 'end'}} onClick={revealAnswers}>
                        V
                    </button>
                </div>
                <hr></hr>
            </div>
            {showAnswers ? (
                <div>
                    <NewAnswer questionId={props.questionId}/>
                    {answersList.map((answer) => <SingleAnswer answer={answer.content} courseId={props.courseId} questionId={props.questionId}/>)}
                </div>
            ) : (null)}
        </div>
    )
}

export default SingleQuestion