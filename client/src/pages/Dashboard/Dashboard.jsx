
import React, { useState } from 'react';
import './Dashboard.css';
import Header_admin from '../../component/Header_admin/Header_admin';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell} from 'recharts';
import Calendar from '../../component/Calendar/Calendar';

const Dashboard = () => {
  const [openCommentPostId, setOpenCommentPostId] = useState(null);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [likedPost, setLikedPost] = useState(null);
  const toggleComment = (postId) => {
    setOpenCommentPostId(openCommentPostId === postId ? null : postId);
  };
  const handleLike = (postId) => {
    setLikes((prev) => ({
      ...prev,
      [postId]: (prev[postId] || 0) + 1,
    }));
    setLikedPost(postId);
    setTimeout(() => setLikedPost(null), 300);
  };
  const handleAddComment = (postId) => {
    setComments((prev) => ({
      ...prev,
      [postId]: (prev[postId] || 0) + 1,
    }));
    setOpenCommentPostId(null);
  };
  const lineData = [
    { name: 'Mon', uv: 400 },
    { name: 'Tue', uv: 600 },
    { name: 'Wed', uv: 300 },
    { name: 'Thu', uv: 500 },
    { name: 'Fri', uv: 900 },
    { name: 'Sat', uv: 700 },
    { name: 'Sun', uv: 1000 },
  ];
  const pieData = [
    { name: 'Desktop', value: 60 },
    { name: 'Tablet', value: 25 },
    { name: 'Mobile', value: 15 },
  ];
  const stats = [
    { icon: "📊", value: "2,345", label: "Weekly Visit", change: "-16%", color: "red" },
    { icon: "📈", value: "165", label: "Daily Visit", change: "+23%", color: "green" },
    { icon: "🟠", value: "$2 345.00", label: "Weekly Sale", change: "0%", color: "gray" },
  ];
  const COLORS = ['#007bff', '#ffc107', '#28a745'];
  const newsPosts = [
    {
      id: 1,
      name: "Trường Người Ta",
      time: "3 phút",
      content: `bro đào tuấn tắt mic đi :'D 😢\n\n- Đào Tuấn là thầy mà :(`,
      image: "/images/15225379-82d1-4cc9-80bf-c1555fccc605.png"
    },
    {
      id: 2,
      name: "Hội Học Online",
      time: "10 phút",
      content: `- Thầy ơi mạng em lag ạ.\n- Em có nghe rõ không?\n- Alo alo alo alo...`,
      image: "https://i.imgur.com/YgX2UJa.png"
    },
    {
      id: 3,
      name: "Chuyện Trường Lớp",
      time: "25 phút",
      content: `- Mày học hộ tao buổi này đi.\n- Hôm qua tao học hộ mày rồi mà?\n- Thì nay mày học nốt luôn cho tròn.`,
      image: "https://i.imgur.com/qFJNg6L.png"
    }
  ];

  return (
    <div className='dashboard'>
      <div className="dashbar_container">
        <Header_admin />
        <div className="stats-cards">
          {stats.map((item, index) => (
            <div key={index} className="card">
              <div className="card-icon">{item.icon}</div>
              <div className="card-value">{item.value}</div>
              <div className="card-label">{item.label}</div>
              <div className={`card-change ${item.color}`}>{item.change}</div>
            </div>
          ))}
        </div>
        <div className="button-panel">
          <button className="btn btn-primary">Add New User</button>
          <button className="btn btn-secondary">View Reports</button>
          <button className="btn btn-success">Settings</button>
          <button className="btn btn-danger">Delete</button>
          <button className="btn btn-warning">Warning</button>
          <button className="btn btn-info">Info</button>
        </div>
        <div className="charts-container">
          <div className="line-chart-box">
            <h3>Line Chart</h3>
            <LineChart width={990} height={300} data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            </LineChart>
          </div>

          <div className="pie-chart-box">
            <h3>Pie Chart</h3>
            <PieChart width={450} height={300}>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={120} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
        <div className="post-box">
          <div className="newsfeed">
            {newsPosts.map((post) => (
              <div className="post-card" key={post.id}>
                <div className="post-header">
                  <img
                    src={`https://i.pravatar.cc/40?u=${post.name}`}
                    alt="avatar"
                    className="avatar"
                  />
                  <div>
                    <div className="post-name">{post.name}</div>
                    <div className="post-time">{post.time}</div>
                  </div>
                </div>

                <pre className="post-content">{post.content}</pre>

                {post.image && (
                  <img src={post.image} alt="post" className="post-image" />
                )}

                <div className="post-actions">
                  <button
  onClick={() => handleLike(post.id)}
  className={`like-button ${likedPost === post.id ? 'liked' : ''}`}
>
  👍 Thích ({likes[post.id] || 0})
</button>
                  <button onClick={() => toggleComment(post.id)}>
                    💬 Bình luận ({comments[post.id] || 0})
                  </button>
                </div>

                {openCommentPostId === post.id && (
                  <div className="comment-section">
                    <textarea
                      placeholder="Viết bình luận..."
                      className="comment-input"
                    />
                    <button className="comment-submit" onClick={() => handleAddComment(post.id)}>
                      Gửi
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
