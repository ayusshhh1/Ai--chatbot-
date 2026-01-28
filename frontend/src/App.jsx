import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Send, Trash2, Copy, Check, MessageSquare, Sparkles, Moon, Sun, Zap, Lightbulb, Code, Briefcase, Clock } from 'lucide-react';

const API_URL = 'http://localhost:8000';

// Suggested prompts for quick start
const SUGGESTED_PROMPTS = [
  { icon: Lightbulb, text: "Explain quantum computing in simple terms", category: "Learn" },
  { icon: Code, text: "Write a Python function to sort a list", category: "Code" },
  { icon: Briefcase, text: "Help me write a professional email", category: "Work" },
  { icon: Zap, text: "Give me 5 productivity tips for developers", category: "Tips" },
];

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [conversationId, setConversationId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    initializeConversation();
  }, []);

  const initializeConversation = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/conversations`);
      setConversationId(response.data.id);
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  const handleSendMessage = async (e, customMessage = null) => {
    if (e) e.preventDefault();
    
    const messageToSend = customMessage || inputMessage.trim();
    if (!messageToSend || !conversationId || isLoading) return;

    setInputMessage('');
    
    const newMessage = { 
      role: 'user', 
      content: messageToSend,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/chat`, {
        message: messageToSend,
        conversation_id: conversationId
      });

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.data.response,
        id: response.data.message_id,
        timestamp: new Date().toISOString()
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSuggestedPrompt = (promptText) => {
    handleSendMessage(null, promptText);
  };

  const handleClearChat = async () => {
    if (!conversationId) return;
    
    if (window.confirm('Clear this conversation? This cannot be undone.')) {
      try {
        await axios.delete(`${API_URL}/api/conversations/${conversationId}`);
        setMessages([]);
        initializeConversation();
      } catch (error) {
        console.error('Error clearing chat:', error);
      }
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`flex flex-col h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <header className={`border-b transition-colors duration-300 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className={`text-base sm:text-lg font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>AI Assistant</h1>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Powered by Gemini 2.5
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                title={darkMode ? 'Light mode' : 'Dark mode'}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={handleClearChat}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                  darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 sm:py-16">
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-6 shadow-xl ${
                darkMode ? 'bg-gradient-to-br from-blue-600 to-indigo-600' : 'bg-gradient-to-br from-blue-100 to-indigo-100'
              }`}>
                <MessageSquare className={`w-8 h-8 sm:w-10 sm:h-10 ${darkMode ? 'text-white' : 'text-blue-600'}`} />
              </div>
              
              <h2 className={`text-xl sm:text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                How can I help you today?
              </h2>
              
              <p className={`text-sm sm:text-base text-center max-w-md mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Ask me anything or try one of these suggestions
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                {SUGGESTED_PROMPTS.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedPrompt(prompt.text)}
                    className={`group flex items-start gap-3 p-4 rounded-xl text-left transition-all duration-200 ${
                      darkMode ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-blue-500' : 'bg-white hover:bg-gray-50 border border-gray-200 hover:border-blue-400 shadow-sm hover:shadow-md'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                      darkMode ? 'bg-blue-600 group-hover:bg-blue-500' : 'bg-blue-100 group-hover:bg-blue-200'
                    }`}>
                      <prompt.icon className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-blue-600'}`} />
                    </div>
                    <div className="flex-1">
                      <div className={`text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {prompt.category}
                      </div>
                      <div className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                        {prompt.text}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div key={index} className={`mb-6 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`group relative max-w-[85%] sm:max-w-2xl ${message.role === 'user' ? 'ml-4 sm:ml-12' : 'mr-4 sm:mr-12'}`}>
                <div className={`rounded-2xl px-4 py-3 transition-all duration-200 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : darkMode ? 'bg-gray-800 border border-gray-700 text-gray-100 shadow-lg' : 'bg-white border border-gray-200 text-gray-900 shadow-md'
                }`}>
                  {message.role === 'assistant' ? (
                    <div className={`prose prose-sm max-w-none ${darkMode ? 'prose-invert' : ''}`}>
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  )}
                </div>

                <div className={`flex items-center gap-2 mt-1 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <span className={`text-xs flex items-center gap-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    <Clock className="w-3 h-3" />
                    {formatTime(message.timestamp)}
                  </span>
                  
                  <button
                    onClick={() => copyToClipboard(message.content, index)}
                    className={`opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    {copiedId === index ? (
                      <Check className="w-3.5 h-3.5 text-green-600" />
                    ) : (
                      <Copy className={`w-3.5 h-3.5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="mb-6 flex justify-start">
              <div className="max-w-2xl mr-4 sm:mr-12">
                <div className={`rounded-2xl px-4 py-3 ${
                  darkMode ? 'bg-gray-800 border border-gray-700 shadow-lg' : 'bg-white border border-gray-200 shadow-md'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <div className={`w-2 h-2 rounded-full animate-bounce ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></div>
                      <div className={`w-2 h-2 rounded-full animate-bounce ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`} style={{ animationDelay: '0.1s' }}></div>
                      <div className={`w-2 h-2 rounded-full animate-bounce ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`} style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>AI is thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className={`border-t transition-colors duration-300 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={handleSendMessage} className="flex gap-2 sm:gap-3">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={!conversationId || isLoading}
              className={`flex-1 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed transition-all ${
                darkMode ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500'
              }`}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || !conversationId || isLoading}
              className="px-4 sm:px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-medium">Send</span>
            </button>
          </form>
          
          <p className={`text-xs text-center mt-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            AI can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;