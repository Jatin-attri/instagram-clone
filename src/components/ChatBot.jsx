import React, { useState, useEffect, useRef } from 'react';
import '../styles/chatbot.css';
import botAvatar from '../assets/images/bot.png';
 // Make sure you have a bot.png in your assets

 import { Link } from 'react-router-dom';
export default function ChatBot() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello there! How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Ref for the chat box to enable auto-scrolling
  const chatBoxRef = useRef(null);

  // Scroll to the bottom of the chat box when messages update
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Filter out the initial bot message from the history sent to the API
      const conversationHistory = messages
        .filter(msg => msg.sender !== 'bot')
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }],
        }));

      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, history: conversationHistory }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      const botMessage = { sender: 'bot', text: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('API Error:', error);
      const errorMessage = { sender: 'bot', text: "Sorry, I'm having trouble connecting right now." };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
    <div className="chat-container">
      <div className="chat-header">
        <div className="header-left">
          <Link to='/home'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="back-icon">
            <path d="M15 18l-6-6 6-6"/>
          </svg></Link>
          <div className="profile">
            <div className="profile-image">
              <img src={botAvatar} alt="Attri Ai" />
            </div>
            <div className="profile-info">
              <h3>Attri Ai</h3>
              <p className="online-status">Online</p>
            </div>
          </div>
        </div>
        <div className="header-right">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mic-icon">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="22"/>
          </svg>
        </div>
      </div>
      <div className="chat-box" ref={chatBoxRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.sender}`}>
            <div className="message-content">
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="chat-message bot typing">
            <div className="message-content">
              <div className="dot-animation">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="chat-input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Write your message..."
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
</>
  );
}
