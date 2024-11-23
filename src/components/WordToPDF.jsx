import React, { useState } from "react";
import { saveAs } from "file-saver";
import * as PDFLib from "pdf-lib";
import FileViewer from "react-file-viewer";
import "./style.css";

const WordToPdfConverter = () => {
  const [rightside, setRightSide] = useState(false);
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  // Handle file selection
  const handleFileSelection = (uploadedFile) => {
    if (uploadedFile) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setFileData(fileReader.result);
        setFile(uploadedFile);
        setMetadata({
          name: uploadedFile.name,
          size: `${(uploadedFile.size / 1024).toFixed(2)} KB`,
          type: uploadedFile.type,
        });
        setRightSide(true); // Set the right side to true after file upload
      };
      fileReader.readAsArrayBuffer(uploadedFile);
    }
  };

  // Handle file change event from input or drop
  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    handleFileSelection(uploadedFile);
  };

  // Handle drag-and-drop events
  const handleDrag = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(event.type === "dragover");
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    const uploadedFile = event.dataTransfer.files[0];
    handleFileSelection(uploadedFile);
  };

  // Convert Word document to PDF
  // Convert Word document to PDF
const convertToPdf = async () => {
  if (!file) {
    alert("Please upload a Word document first!");
    return;
  }

  try {
    console.log("Starting file conversion...");

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("file", file);

    console.log("Sending file to the server...");
    
    // Send the file to the FastAPI backend
    const response = await fetch("http://localhost:8000/convert/", {
      method: "POST",
      body: formData,
    });

    console.log(`Response received. Status: ${response.status}`);

    // Check if the response is OK
    if (!response.ok) {
      const errorMessage = `Failed to convert document: ${response.statusText}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    // Log headers for debugging
    console.log("Response headers:", response.headers);

    // Get the converted PDF file as a blob
    const pdfBlob = await response.blob();

    console.log("PDF blob received:", pdfBlob);

    // Save the blob for download
    setPdfBlob(pdfBlob);

    console.log("PDF blob set to state.");

    alert("Word document converted to PDF successfully!");
  } catch (error) {
    console.error("Error converting to PDF:", error);
    alert("Failed to convert document to PDF. Please try again.");
  }
};


  // Download PDF
  const downloadPdf = () => {
    if (pdfBlob) {
      saveAs(pdfBlob, "converted-document.pdf");
    } else {
      alert("No PDF available for download.");
    }
  };

  // Go back to the home page (reset state)
 const goBackHome = () => {
  setFile(null);
  setFileData(null);
  setMetadata(null);
  setPdfBlob(null);
  setRightSide(false);

  // Reset the file input field
  document.getElementById("file-input").value = "";
};

  return (
    <div className="container">
      <div className="left-section">
        <h1>Word to PDF Converter</h1>
        <div
          className={`drag-and-drop-box ${dragActive ? "active" : ""}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-input").click()}
          style={{
            width: "100%",
            height: "80%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center", // Optional centering of content
            border: "2px dashed #007BFF", // Dashed border with color
            borderRadius: "15px", // Rounded corners
          }}
        >
          {dragActive ? (
            <p style={{ color: "#007BFF", margin: "40px", fontWeight: "bold", display: "flex", justifyContent: "center" }}>Drop your word file here</p>
          ) : file ? (
            <p>File Uploaded: {metadata?.name}</p>
          ) : (
            <p style={{ display: "flex", justifyContent: "center", margin: "16px" }}>Drag and drop a Word document here, or click to upload.</p>
          )}
          <input
            id="file-input"
            type="file"
            accept=".doc,.docx"
            className="file-input"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
        {file && (
          <div>
            <h3>Uploaded File Metadata:</h3>
            <ul>
              <li>
                <strong>Name:</strong> {metadata?.name}
              </li>
              <li>
                <strong>Size:</strong> {metadata?.size}
              </li>
              <li>
                <strong>Type:</strong> {metadata?.type}
              </li>
            </ul>
          </div>
        )}
        <div style={{ marginTop: "20px" }}>
          {!pdfBlob ? (
            <button onClick={convertToPdf} style={buttonStyle}>
              Convert to PDF
            </button>
          ) : (
            <button
              onClick={downloadPdf}
              style={{ ...buttonStyle, marginLeft: "10px" }}
            >
              Download PDF
            </button>
          )}
          {rightside && (
            <button
              onClick={goBackHome}
              style={{
                ...buttonStyle,
                marginLeft: "10px",
                backgroundColor: "#DC3545",
              }}
            >
              Back to Home
            </button>
          )}
        </div>
      </div>
      {rightside && (
        <div className="right-section">
          {file ? (
            <>
              <h3>Document Preview:</h3>
              <div style={{ width: "100%", height: "100%", overflowX: "hidden" }}>
                {/* Update the key prop to force FileViewer to reset */}
                <FileViewer
                  key={file.name} // Ensure the FileViewer re-renders with the new file
                  fileType="docx"
                  filePath={URL.createObjectURL(file)}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </>
          ) : (
            <p>No document uploaded yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default WordToPdfConverter;