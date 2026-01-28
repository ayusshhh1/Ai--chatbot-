# How to Get Your FREE Google Gemini API Key

## Why Google Gemini?

✅ **100% FREE** with generous limits
✅ **15 requests per minute**
✅ **1,500 requests per day**
✅ **1 million requests per month**
✅ **No credit card required**
✅ **Fast responses**
✅ **High quality AI**

## Step-by-Step Guide

### 1. Go to Google AI Studio
Open your browser and go to:
```
https://aistudio.google.com/apikey
```

### 2. Sign In
- Click "Sign in" in the top right
- Use your Google account (Gmail)
- If you don't have one, create a free Google account

### 3. Create API Key
- Click the blue button "**Create API Key**"
- You may see a dropdown:
  - Select "**Create API key in new project**" (recommended)
  - Or use an existing Google Cloud project if you have one

### 4. Copy Your API Key
- Your API key will appear (looks like: `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXX`)
- Click the **copy icon** to copy it
- **IMPORTANT:** Save it somewhere safe!

### 5. Add to Your Project
- Open your `backend/.env` file in VS Code
- Replace the placeholder with your actual key:
```
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXX
DATABASE_URL=postgresql://chatbot_user:chatbot_pass@localhost:5432/chatbot_db
```

### 6. You're Done! 🎉
- Save the `.env` file
- Start your backend server
- Your chatbot is now powered by FREE Google Gemini!

## Free Tier Limits

| Limit Type | Amount |
|------------|--------|
| Requests per minute | 15 RPM |
| Requests per day | 1,500 RPD |
| Requests per month | 1 million RPM |
| Cost | **FREE!** |

**Note:** These limits are MORE than enough for personal projects and testing!

## Gemini Models Available (All FREE)

1. **gemini-1.5-flash** (Recommended) ⚡
   - Fastest responses
   - Great quality
   - Best for chatbots
   - Default in this project

2. **gemini-1.5-pro** 🎯
   - More capable
   - Slightly slower
   - Better reasoning
   - Change in `main.py` if needed

3. **gemini-1.0-pro** 🔧
   - Older but stable
   - Good for simple tasks

## Troubleshooting

### "API key not valid"
- Make sure you copied the entire key (no spaces)
- Check that your `.env` file is saved
- Restart your backend server after changing `.env`

### "Quota exceeded"
- You've hit the daily limit (1,500 requests)
- Wait until tomorrow (resets at midnight PT)
- Or create a new project for more quota

### "Permission denied"
- Make sure you're signed in to Google AI Studio
- Try creating a new API key
- Check if the key is enabled

## Security Tips

⚠️ **NEVER share your API key publicly**
⚠️ **Don't commit `.env` to GitHub**
⚠️ **Keep it private**

The `.gitignore` file already excludes `.env` from version control.

## Need Help?

- Gemini Documentation: https://ai.google.dev/docs
- API Key Help: https://aistudio.google.com/app/apikey
- This project's README: See `README.md` in project root

---

**Enjoy your FREE AI chatbot! 🚀**
