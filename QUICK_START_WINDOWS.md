# Windows Quick Start Guide - Google Gemini Version

## Before You Start

Make sure you have:
✅ Python installed (`python --version`)
✅ Node.js installed (`node --version`)
✅ Your Google Gemini API key (Get FREE at: https://aistudio.google.com/apikey)

## Step 1: Navigate to Project

```bash
cd path\to\ai-chatbot
```
Example: `cd C:\Users\YourName\Desktop\ai-chatbot`

## Step 2: Backend Setup

```bash
cd backend
```

```bash
python -m venv venv
```

```bash
venv\Scripts\activate
```
**You should see (venv) in your prompt**

```bash
pip install -r requirements.txt
```
**Wait 1-2 minutes for installation**

```bash
copy .env.example .env
```

**NOW EDIT .env FILE:**
Open `backend/.env` in VS Code and add your Gemini API key:
```
GEMINI_API_KEY=your-actual-gemini-key-here
DATABASE_URL=sqlite:///./chatbot.db
```

## Step 3: Choose Database

### OPTION A: SQLite (EASIEST - Recommended for testing)

Rename files:
1. `database.py` → `database_postgres.py`
2. `database_sqlite.py` → `database.py`

Update `.env`:
```
GEMINI_API_KEY=your-actual-gemini-key-here
DATABASE_URL=sqlite:///./chatbot.db
```

### OPTION B: PostgreSQL (For production)

Keep files as is and set up PostgreSQL database (see SETUP_GUIDE.md)

## Step 4: Start Backend

```bash
python main.py
```

**Should see:** `🚀 Server running on http://localhost:8000`
**✅ LEAVE THIS RUNNING!**

## Step 5: Frontend Setup (NEW TERMINAL)

Open new terminal (click + in VS Code terminal panel):

```bash
cd frontend
```

```bash
npm install
```
**Wait 2-3 minutes**

```bash
npm run dev
```

**Should see:** `Local: http://localhost:3000/`

## Step 6: Open Browser

Go to: `http://localhost:3000`

**🎉 DONE! Try saying "Hello!"**

## Quick Troubleshooting

**"python not recognized":** Use `python3` instead of `python`

**"virtual environment won't activate":** 
Run PowerShell as Administrator:
```bash
Set-ExecutionPolicy RemoteSigned
```

**"GEMINI_API_KEY not found":** 
- Make sure you saved the `.env` file
- Restart the backend server

**Get your FREE Gemini API key:**
https://aistudio.google.com/apikey

## Stop Servers

Press `Ctrl+C` in each terminal window

---

**Need detailed help? See SETUP_GUIDE.md or GET_GEMINI_KEY.md**
