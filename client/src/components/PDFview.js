// import React, { useState } from 'react';
// import { Document, Page } from 'react-pdf';
// // import resume from '../public/Resume'

// const ViewPdf = (props) => {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
// //   console.log(props.file)

//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages);
//   }

//   return (
//     <div>
//       <Document
//         file={'StatusOfRegistration.pdf'}
//         onLoadSuccess={onDocumentLoadSuccess}
//       >
//         <Page pageNumber={pageNumber} />
//       </Document>
//       <p>Page {pageNumber} of {numPages}</p>
//     </div>
//   );
// }

// export default ViewPdf

import React, { useState } from "react";
import { Document, Page } from "react-pdf";

const ViewPdf = (props) => {
  console.log(props.pdf)
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const { pdf } = props;

  return (
    <>
      <Document
        file={pdf}
        // options={{ workerSrc: "/pdf.worker.js" }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        <p>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </>
  );
}
