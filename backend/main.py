from fastapi import FastAPI, File, UploadFile, HTTPException, BackgroundTasks
from fastapi.responses import FileResponse
from docx2pdf import convert
import os
import tempfile
import shutil

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(docs_url="/docs")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your React app's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def delete_file(file_path: str):
    """Background task to delete a file after it has been served."""
    if os.path.exists(file_path):
        os.remove(file_path)
        print(f"Deleted file: {file_path}")

@app.post("/convert/")
async def convert_docx_to_pdf(file: UploadFile = File(...)):
    try:
        # Save the uploaded file temporarily
        temp_dir = "temp_upload"
        os.makedirs(temp_dir, exist_ok=True)
        temp_file_path = os.path.join(temp_dir, file.filename)
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Convert DOCX to PDF
        pdf_output_path = temp_file_path.replace(".docx", ".pdf")
        convert(temp_file_path, pdf_output_path)

        # Return the PDF file
        return FileResponse(
            pdf_output_path,
            media_type="application/pdf",
            filename=file.filename.replace(".docx", ".pdf")
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")
    finally:
        # Cleanup
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
