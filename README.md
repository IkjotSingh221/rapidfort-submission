
# Word to PDF Converter!
![RapidFort-GoogleChrome2024-11-2322-27-23online-video-cutter com-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/2832c954-3170-4093-99eb-b32e02e8fd9b)

This project provides a simple web application to convert Word documents (.docx) to PDF files. It consists of a FastAPI backend and a React frontend.


## Live Demo

The frontend is hosted on Vercel: [https://rapidfort-submission.vercel.app/](https://rapidfort-submission.vercel.app/)

## Features

* Drag and drop or file selection for uploading Word documents.
* Displays metadata (name, size, type) of the uploaded file.
* Converts .docx files to .pdf using the `docx2pdf` library.
* Downloads the converted PDF file.
* User-friendly interface built with React.
* FastAPI backend for handling file uploads and conversion.




## Installation and Setup

### Backend (FastAPI)

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/word-to-pdf-converter.git](https://github.com/IkjotSingh221/rapidfort-submission.git)  # Replace with your repo URL
   cd word-to-pdf-converter/backend
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
3. **Run the backend:**
   ```bash
   uvicorn main:app --reload
   ```
   This will start the FastAPI server on `http://localhost:8000`.


### Frontend (React)

1. **Navigate to the frontend directory:**
   ```bash
   cd ../frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```
3. **Start the development server:**
   ```bash
   npm start
   ```
   This will start the React development server.  By default, it runs on `http://localhost:3000`.


## Dockerization (Partial)

An attempt was made to dockerize the backend. However, due to limitations with the `libreoffice` dependency within the Linux image used, the conversion functionality does not work within the Docker container.  Further investigation is needed to resolve this issue.  The current Dockerfile is provided as a starting point.

## Usage

1. Upload a .docx file using either drag and drop or the file selection button.
2. Click "Convert to PDF".
3. Once the conversion is complete, a download button will appear. Click it to download the PDF.

## Technologies Used

* **Backend:** Python, FastAPI, `docx2pdf` library
* **Frontend:** React, `file-saver`, `react-file-viewer`

