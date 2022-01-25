import React, { useRef, useState, useEffect } from 'react';
import LiveChat from './LiveChat.js';
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';
import  {Document, Page} from 'react-pdf/dist/umd/entry.webpack';
import { get, post } from "../utilities";



import './LiveClassStudent.css'
import './LiveClassQuestions.css'


const LectureSlides = React.forwardRef((props, ref) => (
    <div ref={ref}>
        <Document file ={`data:application/pdf;base64,${props.slides}`}>
            <Page pageNumber={props.slidePage} />
        </Document>
    </div>

));

const ClassQuestions = React.forwardRef((props, ref) => (
    <div ref={ref} className='live-questions-container'>
        <div className='title'>
            Class Questions
        </div>
        <LiveChat courseId={props.courseId}/>
    </div>
))

const LiveClassStudent = (props) => {        
    const componentRef = useRef();
    const questions = useRef()

    const [currentSlidePage, setCurrentSlidePage] = useState(1)
    const [slides, setSlides] = useState()

    useEffect(() => {

        get("/api/slides", {courseId: props.courseId}).then((rawPDF) => {
			setSlides(rawPDF.data)
		})
    }, [slides])

    useEffect(() => {
        get('/api/slideNum', {courseId: props.courseId}).then((curSlide) => {
            setCurrentSlidePage(curSlide)
        })
    }, [currentSlidePage])
    
    
    return (
        <div>
            <div className='slides-questions-container'>
                <LectureSlides ref={componentRef} slidePage={currentSlidePage} slides={slides}/>
                <ClassQuestions ref={questions} courseId={props.courseId}/>
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