
import { useState, useEffect } from 'react';
import './Message.css';
import {socket} from "../../../utils/socket";
import {jwtDecode }from 'jwt-decode';
import { getAllTinNhan, createTinNhan } from '../../../routes/tinnhan';
import { getAll } from '../../../routes/TaiKhoan';

const Message = () => {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const userId = decoded.id; 
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    socket.emit("add-user", userId);

    const fetchContacts = async () => {
      try {
        const allUsers = await getAll(token);
        const filtered = allUsers.filter((u) => u.id !== Number(userId));
        setContacts(filtered);
      } catch (error) {
        console.error('Lỗi tải danh sách liên hệ:', error);
      }
    };
    fetchContacts();
    socket.on("msg-receive", ({ from, message }) => {
      if (selectedUser && from === selectedUser.id) {
        setMessages(prev => [...prev, { NoiDung: message, sender: 'them' }]);
      }
    });
    return () => {
      socket.off("msg-receive");
    };
  }, [selectedUser]);

  const handleSelectUser = async (user) => {
    setSelectedUser(user);
    await loadMessages(user);
  };

  const loadMessages = async (user) => {
    try {
      const allMessages = await getAllTinNhan(token);
      const filtered = allMessages.filter(
        (msg) =>
          (msg.NguoiGui === userId && msg.NguoiNhan === user.id) ||
          (msg.NguoiGui === user.id && msg.NguoiNhan === userId)
      );
      setMessages(
        filtered.map((msg) => ({
          ...msg,
          sender: msg.NguoiGui === userId ? 'me' : 'them',
        }))
      );
    } catch (err) {
      console.error('Lỗi tải tin nhắn:', err);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !selectedUser) return;

    const messageData = {
      NguoiGui: userId,
      NguoiNhan: selectedUser.id,
      NoiDung: input,
      Tgian: new Date()
    };

    try {
      await createTinNhan(messageData,token); 
      socket.emit("send-msg", {
        NguoiGui: userId,
        NguoiNhan: selectedUser.id,
        NoiDung: input,
        Tgian: new Date()
      });
      setMessages(prev => [...prev, { NoiDung: input, sender: 'me' }]);
      setInput('');
    } catch (err) {
      console.error('Lỗi gửi tin nhắn:', err);
    }
  };

  return (
  
    <div className="mess">
      <div className="mmm">
       <div className="chat-app">
            <div className="mess-sidebar">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="search-box"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <hr />
              <ul className="contact-list">
                {contacts
                  .filter((c) =>
                    c.Username?.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((c) => (
                    <li  key={c.id}  className={`message_contact ${selectedUser?.id === c.id ? 'active' : ''}`}   onClick={() => handleSelectUser(c)} >
                      <div className="message_avatar"><img src={`http://localhost:3000/uploads/${c.anh}` || '👤'}  className="avatar"/></div>
                      <div className="message_info">
                        <div className="message_name">{c.Username}</div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="mess_chat-container">
              {selectedUser ? (
                <>
                  <div className="chat-header">
                    <div className="message_avatar"><img src={`http://localhost:3000/uploads/${selectedUser.anh}` || '👤'}  className="avatar"/></div>
                    <div className="info">
                      <div className="name">{selectedUser.Username}</div>
                    </div>
                  </div>
                  <div className="m-chat-body">
                    {messages.map((m, i) => (
                      <div key={i} className={`mess_message ${m.sender}`}>
                        {m.NoiDung}
                      </div>
                    ))}
                  </div>
                  <div className="chat-input">
                    <input
                      type="text"
                      placeholder="Nhập tin nhắn..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <button onClick={sendMessage}>Gửi</button>
                  </div>
                </>
              ) : (
                <div className="mess_empty">Chưa có liên hệ nào. Hãy bắt đầu cuộc trò chuyện!</div>
              )}
            </div>
          </div>
      </div>
    </div>
  );
};

export default Message;
