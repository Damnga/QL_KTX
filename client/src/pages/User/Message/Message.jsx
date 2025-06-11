import { useState, useEffect, useRef } from 'react';
import './Message.css';
import { socket } from "../../../utils/socket";
import { jwtDecode } from 'jwt-decode';
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
  const chatBodyRef = useRef();

  useEffect(() => {
    socket.emit("add-user", userId);
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const allUsers = await getAll(token);
      const filtered = allUsers.filter((u) => u.id !== Number(userId));
      setContacts(filtered);
    } catch (error) {
      console.error('Lỗi tải danh sách liên hệ:', error);
    }
  };

  const loadMessages = async (user = selectedUser) => {
    if (!user) return;
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
      scrollToBottom();
    } catch (err) {
      console.error('Lỗi tải tin nhắn:', err);
    }
  };

  useEffect(() => {
    if (!selectedUser) return;
    loadMessages(selectedUser);

    // Auto reload mỗi 3s
    const interval = setInterval(() => loadMessages(selectedUser), 3000);

    return () => clearInterval(interval);
  }, [selectedUser]);

  useEffect(() => {
    socket.on("msg-receive", ({ from }) => {
      if (selectedUser && from === selectedUser.id) {
        loadMessages(selectedUser); // Tự động reload tất cả tin nhắn khi nhận
      }
    });
    return () => socket.off("msg-receive");
  }, [selectedUser]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
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
      await createTinNhan(messageData, token);
      socket.emit("send-msg", messageData);
      setMessages((prev) => [...prev, { NoiDung: input, sender: 'me' }]);
      setInput('');
      scrollToBottom();
    } catch (err) {
      console.error('Lỗi gửi tin nhắn:', err);
    }
  };

  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
                  <li
                    key={c.id}
                    className={`message_contact ${selectedUser?.id === c.id ? 'active' : ''}`}
                    onClick={() => handleSelectUser(c)}
                  >
                    <div className="message_avatar">
                      <img
                        src={`http://localhost:3000/uploads/${c.anh}` || '👤'}
                        className="avatar"
                        alt=""
                      />
                    </div>
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
                  <div className="message_avatar">
                    <img
                      src={`http://localhost:3000/uploads/${selectedUser.anh}` || '👤'}
                      className="avatar"
                      alt=""
                    />
                  </div>
                  <div className="info">
                    <div className="name">{selectedUser.Username}</div>
                  </div>
                </div>
                <div className="m-chat-body" ref={chatBodyRef}>
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
              <div className="mess_empty">Chọn một liên hệ để bắt đầu trò chuyện!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
