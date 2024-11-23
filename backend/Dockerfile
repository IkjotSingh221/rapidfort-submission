# Use an official Python runtime as a parent image
FROM python:3.11-alpine

# Set the working directory in the container
WORKDIR /

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend application code
COPY . .

# Expose the backend port (default FastAPI port is 8000)
EXPOSE 8000

# Command to run the backend
CMD ["python", "main.py"]
