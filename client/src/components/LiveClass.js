import React, { useEffect, useState } from 'react'
import { get, post } from "../utilities";

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

    const professorMode = () => {
        setRenderIntro(false)
        setRenderProf(true)
    }

    const studentMode = () => {
        setRenderIntro(false)
        setRenderStudent(true)
    }
    
    if(renderIntro) {
        return (
            <IntroScreen professorClasses={professorClasses} professorMode={professorMode} studentClasses={studentClasses}
                studentMode={studentMode}/>
        )
    }

    else{
        if(renderStudent) {
            return (
                <LiveClassStudent />
            )
        }
        return <LiveClassProf />
    }
}

export default LiveClass