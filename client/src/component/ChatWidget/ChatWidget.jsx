import React,{useState} from 'react'
import "./ChatWidget.css"
import { sendMessageToBot } from '../../routes/chatwidget';
const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const data = await sendMessageToBot(input);
      const botMessage = { role: 'assistant', content: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Lỗi gọi bot:', err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '❌ Đã xảy ra lỗi.' },
      ]);
    }

    setInput('');
  };

  return (
    <div>
      <button className="chat-button" onClick={toggleChat}>
        💬
      </button>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">🤖 AI Chatbot</div>
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.role}`}>
                <b>{msg.role === 'user' ? 'Bạn' : 'AI'}:</b> {msg.content}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Nhập tin nhắn..."
            />
            <button onClick={sendMessage}>Gửi</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget