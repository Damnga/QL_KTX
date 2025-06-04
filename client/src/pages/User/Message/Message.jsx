
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Message.css';

const socket = io('http://localhost:3000'); 

const contactsData = [
  { name: "James Johnson", status: "online", avatar: "🧑🏻" },
  { name: "Maria Hernandez", status: "away", avatar: "👩🏼" },
  { name: "David Smith", status: "busy", avatar: "🧑🏾" },
  { name: "Maria Rodriguez", status: "offline", avatar: "👩🏽" }
];

const Message = () => {
  const [contacts] = useState(contactsData);
  const [search, setSearch] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('chat message', msg => {
      setMessages(prev => [...prev, { text: msg, sender: 'them' }]);
    });
    return () => socket.off('chat message');
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { text: input, sender: 'me' }]);
    socket.emit('chat message', input);
    setInput('');
  };

  return (
  
    <div className="mess">
      <div className="mmm">
      <div className="chat-app">
        <div className="mess-sidebar">
          <input  type="text"   placeholder="Tìm kiếm..."   className="search-box"   value={search}  onChange={e => setSearch(e.target.value)}/>
          <hr/>
          <ul className="contact-list">
            {contacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
              .map((c, i) => (
              <li key={i} className="contact">
                <div className="avatar">{c.avatar}</div>
                <div className="info">
                  <div className="name">{c.name}</div>
                  <div className={`status ${c.status}`}>{c.status}</div>
                </div>
              </li>
            ))}
          </ul>
        </div> 
        <div className="chat-container">
          <div className="chat-header">
            <div className="avatar">🧑🏻</div>
            <div className="info">
              <div className="name">James Johnson</div>
              <div className="status online">online</div>
            </div>
          </div>
          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`message ${m.sender}`}>{m.text}</div>
            ))}
          </div>
          <div className="chat-input">
            <input 
              type="text" 
              placeholder="Nhập tin nhắn..." 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
            />
            <button  onClick={sendMessage}>Gửi</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Message;
