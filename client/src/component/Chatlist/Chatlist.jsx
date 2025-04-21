import React,{useState} from 'react'
import "./Chatlist.css";
const Chatlist = ({ onSelectUser }) => {
  const users = [
    { id: 1, name: "James Johnson", status: "online", avatar: "/avatar1.png" },
    { id: 2, name: "Maria Hernandez", status: "away", avatar: "/avatar2.png" },
    { id: 3, name: "David Smith", status: "busy", avatar: "/avatar3.png" },
  ];
  return (
    <div className="chat-list">
      <input className="search-input" placeholder="Search Contact..." />
      {users.map((user) => (
        <div key={user.id} className="chat-user" onClick={() => onSelectUser(user)}>
          <img src={user.avatar} alt={user.name} />
          <div>
            <div className="chat-user-name">{user.name}</div>
            <div className={`chat-status ${user.status}`}>{user.status}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Chatlist