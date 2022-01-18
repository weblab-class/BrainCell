import React from 'react'
import ClassQuestions from './LiveClassQuestions.js'

import './LiveClass.css'

const LiveClass = () => {
    return (
        <div>
            <div className='slides-questions-container'>
                <div className='slides'>
                    Lecture Slides
                </div>
                <ClassQuestions/>
            </div>
            <div className='buttons-container'>
                <div className='screenshot'>
                    Screenshot
                </div>
                <span className='save-questions'>
                    Save Questions
                </span>
            </div>
            
        </div>
    )
}

export default LiveClass