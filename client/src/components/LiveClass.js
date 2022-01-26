import React, { useEffect, useState } from 'react'
import { get } from "../utilities";

import LiveClassStudent from './LiveClassStudent.js';
import LiveClassProf from './LiveClassProf.js';
import IntroScreen from './LiveClassIntroScreen.js';


const LiveClass = (props) => {
    const [classes, setClasses] = useState([])
    const [studentClasses, setStudentClasses] = useState([])
    const [professorClasses, setProfessorClasses] = useState([])
    let studClasses = []
    let profClasses = []
    const [renderProf, setRenderProf] = useState(false)
    const [renderStudent, setRenderStudent] = useState(false)
    const [renderIntro, setRenderIntro] = useState(true)
    const [courseInSession, setCourseInSession] = useState()

    useEffect(() => {
        get('/api/course', {id: props.userId}).then((courses) => {
            setClasses(courses)

        for(let i = 0; i < classes.length; i++){  
            let profMode = false 
            for (let j = 0; j < classes[i].staff.length; j++){
                if (classes[i].staff[j].userId === props.userId){
                    profMode = true
                    profClasses.push(classes[i])
                    break;
                }
            }
            if(!profMode){
                studClasses.push(classes[i])
            }
        }

        setProfessorClasses(profClasses)
        setStudentClasses(studClasses)
    })}, [classes])

    useEffect(() => {
        for(let i = 0; i < studentClasses.length; i++){
            get('/api/sessions', {courseId: studentClasses[i]._id}).then((session) => {
                if (session.courseId !== null){
                    setCourseInSession(session.courseId)
                }
            })
        }
    })

    const professorMode = () => {
        setRenderIntro(false)
        setRenderProf(true)
    }

    const studentMode = () => {
        setRenderIntro(false)
        setRenderStudent(true)
    }

    const profClick = () => {
        setRenderIntro(true)
        setRenderProf(false)
    }

    const classInSession = (courseId) => {
        setCourseInSession(courseId)
    }

    if(renderIntro) {
        return (
            <IntroScreen professorClasses={professorClasses} professorMode={professorMode} studentClasses={studentClasses}
                studentMode={studentMode} setClassInSession={classInSession} />
        )
    }

    else{
        if(renderStudent) {
            return (
                <LiveClassStudent courseId={courseInSession}/>
            )
        }
        return <LiveClassProf courseId={courseInSession} profClick={profClick} setClassInSession={classInSession}/>
    }
}

export default LiveClass