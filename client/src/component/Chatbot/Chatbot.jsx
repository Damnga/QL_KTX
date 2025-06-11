import React, { useState } from 'react';
import { keywordResponses } from './keyword';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    const botMessage = getBotResponse(input);

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput('');
  };

  const getBotResponse = (text) => {
    const lowerText = text.toLowerCase();
    for (const { keywords, response } of keywordResponses) {
      if (keywords.some((kw) => lowerText.includes(kw))) {
        return { sender: 'bot', text: response };
      }
    }
    return {
      sender: 'bot',
      text: 'Xin lỗi, tôi chưa hiểu ý bạn. Bạn có thể hỏi lại được không?',
    };
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="chat-toggle-button" onClick={toggleChatbot}>
        💬
      </button>

      {isOpen && (
        <div className="chatbox-wrapper">
          <div className="chatbox-header">
            <span className="chatbox-title">Chatbot hỗ trợ</span>
            <button className="chatbox-close-btn" onClick={toggleChatbot}>×</button>
          </div>

          <div className="chatbox-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chatbox-msg chatbox-msg-${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chatbox-input-area">
            <input
              type="text"
              className="chatbox-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Nhập tin nhắn..."
            />
            <button className="chatbox-send-btn" onClick={handleSend}>Gửi</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
