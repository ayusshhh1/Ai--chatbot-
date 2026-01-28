# AI Chatbot - Full Stack Application

A modern, simple, and visually appealing AI chatbot built with FastAPI, React, PostgreSQL, and OpenAI.

## Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **PostgreSQL** - Robust relational database
- **SQLAlchemy** - SQL toolkit and ORM
- **Google Gemini API** - gemini-1.5-flash for AI responses (FREE!)

### Frontend
- **React** - UI library
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Markdown** - Markdown rendering
- **Lucide React** - Beautiful icons

## Features

✅ Real-time chat interface
✅ Message history persistence
✅ Typing indicators
✅ Markdown support in responses
✅ Copy messages functionality
✅ Clear chat option
✅ Beautiful gradient UI
✅ Responsive design

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Python 3.8+** - [Download](https://www.python.org/downloads/)
2. **Node.js 16+** - [Download](https://nodejs.org/)
3. **PostgreSQL** - [Download](https://www.postgresql.org/download/)
4. **Google Gemini API Key (FREE!)** - [Get one here](https://aistudio.google.com/apikey)

## Installation & Setup

### 1. Clone or Download the Project

Save the `ai-chatbot` folder to your computer.

### 2. Database Setup

#### Option A: Using PostgreSQL (Recommended for production)

1. Install PostgreSQL if you haven't already
2. Open PostgreSQL command line (psql) or use pgAdmin
3. Create a new database and user:

```sql
CREATE DATABASE chatbot_db;
CREATE USER chatbot_user WITH PASSWORD 'chatbot_pass';
GRANT ALL PRIVILEGES ON DATABASE chatbot_db TO chatbot_user;
```

#### Option B: Using SQLite (Simpler for testing)

If you prefer SQLite instead of PostgreSQL, modify `backend/database.py`:

```python
# Change this line:
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://chatbot_user:chatbot_pass@localhost:5432/chatbot_db")

# To this:
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./chatbot.db")
```

And remove `psycopg2-binary` from `requirements.txt`.

### 3. Backend Setup

1. Open terminal/command prompt
2. Navigate to the backend directory:

```bash
cd ai-chatbot/backend
```

3. Create a virtual environment:

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

4. Install dependencies:

```bash
pip install -r requirements.txt
```

5. Create `.env` file:

```bash
# Copy the example file
cp .env.example .env
```

6. Edit `.env` file and add your Google Gemini API key:

```
GEMINI_API_KEY=your-actual-gemini-api-key-here
DATABASE_URL=postgresql://chatbot_user:chatbot_pass@localhost:5432/chatbot_db
```

7. Run the backend server:

```bash
python main.py
```

Or with uvicorn:
```bash
uvicorn main:app --reload --port 8000
```

The backend should now be running at `http://localhost:8000`

### 4. Frontend Setup

1. Open a NEW terminal/command prompt
2. Navigate to the frontend directory:

```bash
cd ai-chatbot/frontend
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

The frontend should now be running at `http://localhost:3000`

### 5. Access the Application

Open your browser and go to:
```
http://localhost:3000
```

You should see the chatbot interface!

## Project Structure

```
ai-chatbot/
├── backend/
│   ├── main.py              # FastAPI application & routes
│   ├── models.py            # SQLAlchemy database models
│   ├── database.py          # Database configuration
│   ├── schemas.py           # Pydantic schemas for validation
│   ├── requirements.txt     # Python dependencies
│   ├── .env.example         # Environment variables template
│   └── .env                 # Your actual environment variables (create this)
│
└── frontend/
    ├── src/
    │   ├── App.jsx          # Main React component
    │   ├── main.jsx         # Entry point
    │   └── index.css        # Global styles
    ├── index.html           # HTML template
    ├── package.json         # Node.js dependencies
    ├── vite.config.js       # Vite configuration
    ├── tailwind.config.js   # Tailwind CSS configuration
    └── postcss.config.js    # PostCSS configuration
```

## API Endpoints

### Backend API (http://localhost:8000)

- `GET /` - Health check
- `GET /api/health` - API health status
- `POST /api/conversations` - Create new conversation
- `GET /api/conversations/{id}/messages` - Get conversation history
- `POST /api/chat` - Send message and get AI response
- `DELETE /api/conversations/{id}` - Delete conversation

## Troubleshooting

### Backend Issues

**Problem: `ModuleNotFoundError: No module named 'fastapi'`**
- Solution: Make sure you activated the virtual environment and ran `pip install -r requirements.txt`

**Problem: Database connection error**
- Solution: Verify PostgreSQL is running and credentials in `.env` are correct

**Problem: Gemini API error**
- Solution: Check your API key in `.env` file and ensure there are no extra spaces
- Get a free API key at: https://aistudio.google.com/apikey

### Frontend Issues

**Problem: `npm install` fails**
- Solution: Try deleting `node_modules` and `package-lock.json`, then run `npm install` again

**Problem: Can't connect to backend**
- Solution: Ensure backend is running on port 8000 and check console for CORS errors

**Problem: Page is blank**
- Solution: Check browser console for errors and ensure all dependencies installed correctly

## Customization

### Change AI Model

In `backend/main.py`, line 31:
```python
model = genai.GenerativeModel('gemini-1.5-flash')  # Change to 'gemini-1.5-pro' for better responses
```

Available FREE Gemini models:
- `gemini-1.5-flash` - Fast and efficient (recommended)
- `gemini-1.5-pro` - More capable, slightly slower
- `gemini-1.0-pro` - Older but stable

### Change Theme Colors

In `frontend/src/App.jsx`, modify the Tailwind classes:
```jsx
// Current: Blue/Indigo gradient
className="bg-gradient-to-r from-blue-500 to-indigo-600"

// Change to: Purple/Pink gradient
className="bg-gradient-to-r from-purple-500 to-pink-600"
```

### Change Port Numbers

**Backend:** In `backend/main.py`, last line:
```python
uvicorn.run(app, host="0.0.0.0", port=8000)  # Change 8000 to your port
```

**Frontend:** In `frontend/vite.config.js`:
```javascript
server: {
  port: 3000,  // Change to your preferred port
}
```

## Production Deployment

### Backend (Deploy to services like Render, Railway, or AWS)

1. Update database URL for production
2. Set environment variables on your hosting platform
3. Use a proper ASGI server like Gunicorn with Uvicorn workers

### Frontend (Deploy to Vercel, Netlify, or Cloudflare Pages)

1. Update API_URL in `src/App.jsx` to your production backend URL
2. Run `npm run build`
3. Deploy the `dist` folder

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Ensure all prerequisites are installed correctly
3. Verify your OpenAI API key is valid and has credits

---

**Happy Chatting! 🤖💬**
