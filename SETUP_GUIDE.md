# Step-by-Step Setup Guide for VS Code

## Prerequisites Installation

### 1. Install Python
- Go to https://www.python.org/downloads/
- Download Python 3.8 or higher
- During installation, **CHECK "Add Python to PATH"**
- Verify: Open terminal and type `python --version`

### 2. Install Node.js
- Go to https://nodejs.org/
- Download LTS version (recommended)
- Install with default settings
- Verify: Open terminal and type `node --version` and `npm --version`

### 3. Install PostgreSQL
- Go to https://www.postgresql.org/download/
- Download for your OS
- During installation, remember the password you set for postgres user
- Default port: 5432

### 4. Get Google Gemini API Key (FREE!)
- Go to https://aistudio.google.com/apikey
- Sign in with your Google account
- Click "Create API Key"
- Copy and save the key somewhere safe!

## Setting Up in VS Code

### Step 1: Open Project in VS Code

1. Open VS Code
2. Click **File** → **Open Folder**
3. Select the `ai-chatbot` folder
4. Click **Select Folder**

### Step 2: Set Up PostgreSQL Database

1. Open PostgreSQL command line or pgAdmin
2. Run these commands:

```sql
CREATE DATABASE chatbot_db;
CREATE USER chatbot_user WITH PASSWORD 'chatbot_pass';
GRANT ALL PRIVILEGES ON DATABASE chatbot_db TO chatbot_user;
```

**Note:** If you want to use different credentials, remember to update them in the `.env` file later.

### Step 3: Backend Setup

1. In VS Code, open **Terminal** (View → Terminal or Ctrl+`)
2. Navigate to backend folder:
   ```bash
   cd backend
   ```

3. Create virtual environment:
   
   **Windows:**
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```
   
   **Mac/Linux:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
   
   You should see `(venv)` in your terminal prompt.

4. Install Python packages:
   ```bash
   pip install -r requirements.txt
   ```
   
   This will take a few minutes. Wait for it to complete.

5. Create `.env` file:
   - Right-click on `backend` folder
   - Select **New File**
   - Name it `.env` (exactly, with the dot at the start)
   - Open the file and add:
   
   ```
   GEMINI_API_KEY=your-actual-gemini-api-key-here
   DATABASE_URL=postgresql://chatbot_user:chatbot_pass@localhost:5432/chatbot_db
   ```
   
   Replace `your-actual-gemini-api-key-here` with your actual Google Gemini API key!

6. Start the backend server:
   ```bash
   python main.py
   ```
   
   You should see: `🚀 Server running on http://localhost:8000`
   
   **Leave this terminal running!**

### Step 4: Frontend Setup

1. In VS Code, open a **NEW terminal** (Click the + icon in terminal panel)
2. Navigate to frontend folder:
   ```bash
   cd frontend
   ```

3. Install Node.js packages:
   ```bash
   npm install
   ```
   
   This will take a few minutes. Wait for it to complete.

4. Start the frontend server:
   ```bash
   npm run dev
   ```
   
   You should see something like:
   ```
   ➜  Local:   http://localhost:3000/
   ```

### Step 5: Open the Application

1. Open your web browser
2. Go to: `http://localhost:3000`
3. You should see the chatbot interface!
4. Try sending a message like "Hello!"

## Troubleshooting Common Issues

### Issue: "python is not recognized"
**Solution:** 
- Reinstall Python and make sure to check "Add Python to PATH"
- Or use `python3` instead of `python`

### Issue: "pip is not recognized"
**Solution:**
- Make sure you activated the virtual environment
- Or try `python -m pip` instead of `pip`

### Issue: Virtual environment won't activate on Windows
**Solution:**
- Run PowerShell as Administrator
- Execute: `Set-ExecutionPolicy RemoteSigned`
- Try activating again

### Issue: "Module not found" errors
**Solution:**
- Make sure you activated the virtual environment (you should see `(venv)`)
- Run `pip install -r requirements.txt` again

### Issue: Database connection error
**Solution:**
- Make sure PostgreSQL is running
- Verify the database name, username, and password in `.env` match what you created
- Check if port 5432 is correct (default PostgreSQL port)

### Issue: Gemini API error "Invalid API key"
**Solution:**
- Double-check your API key in the `.env` file
- Make sure there are no extra spaces
- Get a free API key at: https://aistudio.google.com/apikey

### Issue: Frontend shows blank page
**Solution:**
- Open browser console (F12)
- Check for errors
- Make sure backend is running on port 8000
- Try refreshing the page

### Issue: "Port already in use"
**Solution:**
- For backend (port 8000): Change port in `main.py` last line
- For frontend (port 3000): Change port in `vite.config.js`

## VS Code Extensions (Optional but Recommended)

Install these extensions for better development experience:

1. **Python** (by Microsoft)
2. **Pylance** (by Microsoft)
3. **ES7+ React/Redux/React-Native snippets**
4. **Tailwind CSS IntelliSense**
5. **Prettier - Code formatter**

## Daily Workflow

### Starting the Application

1. Open VS Code
2. Open Terminal (Ctrl+`)
3. Start Backend:
   ```bash
   cd backend
   venv\Scripts\activate    # Windows
   # or
   source venv/bin/activate  # Mac/Linux
   python main.py
   ```

4. Open NEW terminal (+ icon)
5. Start Frontend:
   ```bash
   cd frontend
   npm run dev
   ```

6. Open browser to `http://localhost:3000`

### Stopping the Application

- In each terminal, press `Ctrl+C` to stop the server
- Close VS Code

## Making Changes

### Backend Changes
- After modifying Python files, you need to restart the backend server
- Press `Ctrl+C` in backend terminal
- Run `python main.py` again

### Frontend Changes
- Vite has hot-reload, so changes appear automatically
- Just save your file and refresh the browser

## Need Help?

1. Check the main `README.md` for more details
2. Make sure all prerequisites are installed correctly
3. Verify your `.env` file has the correct values
4. Check that both backend and frontend servers are running

---

**Congratulations! You've successfully set up your AI Chatbot! 🎉**
