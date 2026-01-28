@echo off
echo ========================================
echo   AI Chatbot - Quick Start (Windows)
echo ========================================
echo.

echo Starting Backend Server...
cd backend
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

call venv\Scripts\activate
echo Installing backend dependencies...
pip install -r requirements.txt

echo.
echo Starting FastAPI server on port 8000...
start cmd /k "python main.py"

cd ..

echo.
echo Starting Frontend Server...
cd frontend
echo Installing frontend dependencies...
call npm install

echo.
echo Starting Vite dev server on port 3000...
start cmd /k "npm run dev"

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause
