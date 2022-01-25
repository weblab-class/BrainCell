import React, { useState, useEffect } from 'react'
import LiveChat from './LiveChat.js'
import FileUploadPage from './Testing.js'
import  {Document, Page} from 'react-pdf/dist/umd/entry.webpack';
import { get, post } from "../utilities";

import './LiveClassProf.css'

const LiveClassProf = (props) => {
    const [uploadingFile, setUploadingFile] = useState(false)
	const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);
	const [retrievedFile, setRetrievedFile] = useState()
	const [x, setX] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)

    useEffect(() => {
        post('/api/slideNum', {courseId: props.courseId, page: pageNumber})
    }, [pageNumber])

    const endSession = () => {
        post('/api/endSession', {courseId: props.courseId})
        props.profClick()
    }

    const backSlide = () => {
        setPageNumber((prev) => prev - 1)
    }

    const nextSlide = () => {
        setPageNumber((prev) => prev + 1)
    }

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
        setUploadingFile(true)
	};

    const showFile = () => {
		get("/api/slides", {courseId: props.courseId}).then((rawPDF) => {
			setRetrievedFile(rawPDF.data)
			setX(true)
		})
	};

    const submitFile = () => {
        const formData = new FormData()
		formData.append("courseId", props.courseId)
		formData.append("toUpload", selectedFile)
		// console.log(formData)
		// post("/api/slides", {courseId: props.courseId})

		//custom post
        fetch("/api/slides", {
			method: "post",
			body: formData,
		}).then(() => {
			showFile()
		})

        setRetrievedFile()
    }

    return (
        <div>
            <div className='slides-questions-container'>
                <div className='prof-slides'>
                    {x ? (
                        <Document file ={`data:application/pdf;base64,${retrievedFile}`}>
                            <Page pageNumber={pageNumber} />
                        </Document>
                    ) : (<div>Please upload lecture slides</div>)}
                </div>                
                <div className='live-questions-container'>
                    <div className='title'>
                        Class Questions
                    </div>
                    <LiveChat courseId={props.courseId}/>
                </div>
            </div>
            <div className='buttons-container'>
                <div style={{width: '70%', display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <button className='slides-button' onClick={backSlide}>
                            Back
                        </button>
                        <button className='slides-button' onClick={nextSlide}>
                            Next
                        </button>
                    </div>
                    {/* <button onClick={uploadSlides}>
                        Upload Slides
                    </button> */}
                    {/* <input type="file" name="file" onChange={changeHandler} /> */}
                    {uploadingFile ? (
                        <button onClick={submitFile}>Submit</button>
                    ) : (<input type="file" name="file" onChange={changeHandler} placeholder='Upload Slides PDF'/>
                    )}
                    {/* {uploadingFile ? (
                        <div>
                            <input type="file" name="file" onChange={changeHandler} />
                            <button onClick={submitFile}>Submit</button>
                        </div>
                    ) : (null)} */}
                    {/* <FileUploadPage courseId={props.courseId}/> */}
                </div>
                <button className='end-session-button' onClick={endSession}>
                    END SESSION
                </button>
            </div>
        </div>
    )
}

export default LiveClassProf