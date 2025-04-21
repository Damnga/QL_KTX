import React,{useState} from 'react'
import "./Chatuser.css";
import Chatlist from '../../component/Chatlist/Chatlist'
import Chatwindow from '../../component/Chatwindow/Chatwindow'
const Chatuser = () => {
   const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className='chatuser'>
      <div className="app-container">
      <Chatlist onSelectUser={setSelectedUser} />
      <Chatwindow user={selectedUser} />
    </div>
    </div>
  )
}

export default Chatuser