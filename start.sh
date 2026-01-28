#!/bin/bash

echo "========================================"
echo "  AI Chatbot - Quick Start (Mac/Linux)"
echo "========================================"
echo ""

# Backend Setup
echo "Starting Backend Server..."
cd backend

if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

source venv/bin/activate
echo "Installing backend dependencies..."
pip install -r requirements.txt

echo ""
echo "Starting FastAPI server on port 8000..."
python main.py &
BACKEND_PID=$!

cd ..

# Frontend Setup
echo ""
echo "Starting Frontend Server..."
cd frontend
echo "Installing frontend dependencies..."
npm install

echo ""
echo "Starting Vite dev server on port 3000..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo "  Setup Complete!"
echo "========================================"
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for user interrupt
wait
