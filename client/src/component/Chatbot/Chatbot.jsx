import { useState }from 'react'
import "./Chatbot.css";
import {sendQuestionToChatbot} from "../../routes/chatbot";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const addMessage = (sender, text) => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    addMessage("user", input);
    setInput("");
    setIsTyping(true);

    try {
      const answer = await sendQuestionToChatbot(input);
      setTimeout(() => {
        addMessage("bot", answer);
        setIsTyping(false);
      }, 1200);
    } catch {
      setTimeout(() => {
        addMessage("bot", "Lỗi kết nối đến chatbot.");
        setIsTyping(false);
      }, 1200);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chatbot-container">
      <h2>💬 Chatbot Ký Túc Xá</h2>
      <div className="chat-window">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message-row ${msg.sender === "user" ? "user" : "bot"}`}
          >
            <div className={`message ${msg.sender}`}>{msg.text}</div>
          </div>
        ))}
        {isTyping && (
          <div className="message-row bot">
            <div className="message typing">...</div>
          </div>
        )}
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Nhập câu hỏi..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isTyping}
        />
        <button onClick={handleSend} disabled={isTyping}>
          Gửi
        </button>
      </div>
    </div>
  );
};


export default Chatbot