import React, { useRef, useState, useEffect } from 'react';
import LiveChat from './LiveChat.js';
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';


import './LiveClassStudent.css'
import './LiveClassQuestions.css'


const LectureSlides = React.forwardRef((props, ref) => (
    <div ref={ref} className='slides'>
        Lecture Slides
    </div>

));

const ClassQuestions = React.forwardRef((props, ref) => (
    <div ref={ref} className='live-questions-container' style={{overflowY: 'scroll'}}>
        <div className='title'>
            Class Questions
        </div>
        <LiveChat courseId={props.courseId}/>
    </div>
))

const LiveClassStudent = (props) => {
    const componentRef = useRef();
    const questions = useRef()
    
    
    return (
        <div>
            <div className='slides-questions-container'>
                <LectureSlides ref={componentRef} />
                <ClassQuestions ref={questions} courseId={props.courseId}/>

                {/* <ClassQuestions saveQuestions={clickedSaveQs}/> */}
            </div>
            <div className='buttons-container'>
                <button className='screenshot' onClick={() => exportComponentAsPNG(componentRef)}>
                    Screenshot
                </button>
                <button className='save-questions' onClick={() => exportComponentAsPNG(questions)}>
                    Save Questions
                </button>
            </div>

            {/* <React.Fragment> */}
            {/* <button onClick={() => exportComponentAsJPEG(componentRef)}>
                Export As JPEG
            </button>
            <button onClick={() => exportComponentAsPDF(componentRef)}>
                Export As PDF
            </button>
            <button onClick={() => exportComponentAsPNG(componentRef)}>
                Export As PNG
            </button> */}
            {/* </React.Fragment> */}
        </div>
  );
};

export default LiveClassStudent;