import React from 'react';
import './Chatwindow.css';

const Chatwindow = ({ user }) => {
  const messages = [
    { from: "me", text: "I'd rather be a bird than a fish." },
    { from: "you", text: "Tom got a small piece of pie." },
    { from: "me", text: "They got there early, and they got good seats." },
    { from: "you", text: "I want more detailed information." },
  ];

  // Nếu chưa có user -> hiển thị placeholder
  if (!user) {
    return (
      <div className="chat-window placeholder">
        <p>💬 Hãy chọn một người để bắt đầu trò chuyện!</p>
      </div>
    );
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <img src={user.avatar} alt={user.name} />
        <div>
          <div className="chat-user-name">{user.name}</div>
          <div className={`chat-status ${user.status}`}>{user.status}</div>
        </div>
      </div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.from === 'me' ? 'me' : 'you'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input placeholder="Nhập tin nhắn..." />
        <button>➤</button>
      </div>
    </div>
  );
};

export default Chatwindow;
