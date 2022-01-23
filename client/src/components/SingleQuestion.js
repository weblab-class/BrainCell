import React, { useState } from 'react'
import SingleAnswer from './SingleAnswer'
import NewAnswer from './NewAnswer.js'

const SingleQuestion = () => {
    const [showAnswers, setShowAnswers] = useState(false)

    const revealAnswers = () => {
        showAnswers ? (
            setShowAnswers(false)
        ) : (setShowAnswers(true))
    }

    return (
        <div>
            <div style={{backgroundColor: '#7a9cc6'}}>
                <div style={{display: 'flex', color: 'white', padding: '8px'}}>
                    Q: Can you go over if-else statements again?
                    
                    <button style={{justifySelf: 'right', alignSelf: 'end'}} onClick={revealAnswers}>
                        V
                    </button>
                </div>
                <hr></hr>
            </div>
            {showAnswers ? (
                <div>
                    <NewAnswer />
                    <SingleAnswer />
                </div>
            ) : (null)}
        </div>
    )
}

export default SingleQuestion