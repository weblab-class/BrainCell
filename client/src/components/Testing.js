import React, {useState} from 'react';
import  {Document, Page} from 'react-pdf/dist/umd/entry.webpack';
import { get, post } from "../utilities";


const FileUploadPage = (props) => {
	const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);
	const [retrievedFile, setRetrievedFile] = useState()
	const [x, setX] = useState(false)

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

	const showFile = () => {
		get("/api/slides", {courseId: props.courseId}).then((rawPDF) => {
			console.log(rawPDF)
			setRetrievedFile(rawPDF.data)
			setX(true)
		})
	};

	const handleSubmission = () => {
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

	};

	
	return(
   <div>
			<input type="file" name="file" onChange={changeHandler} />
			{isSelected ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
			{x ? (
				<Document file ={`data:application/pdf;base64,${retrievedFile}`}>
					<Page pageNumber={1} />
				</Document>
			) : (null)}
			
		</div>
	)
}

export default FileUploadPage