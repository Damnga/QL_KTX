
import React, { useState } from 'react';
import "./Home.css";

const Home = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Nguyễn Văn A",
      avatar: "https://i.pravatar.cc/150?img=1",
      content: "Hôm nay trời đẹp quá, đi chơi không mọi người?",
      image: "https://i.pravatar.cc/",
      timestamp: "2025-05-06T09:30:00",
      likes: 3,
      liked: false,
      comments: [
        { user: "Nguyễn Văn A", text: "Hay quá!" },
        { user: "Trần Thị B", text: "Đi luôn anh ơi!" }
      ]
    },
    {
      id: 2,
      author: "Trần Thị B",
      avatar: "https://i.pravatar.cc",
      content: "Mới hoàn thành xong dự án, cảm giác thật tuyệt vời!",
      image: "https://i.pravatar.cc/",
      timestamp: "2025-05-05T18:00:00",
      likes: 5,
      liked: false,
      comments: [
        { user: "Nguyễn Văn A", text: "Hay quá!" },
        { user: "Trần Thị B", text: "Đi luôn anh ơi!" }
      ]
    },
    {
      id: 3,
      author: "Lê Văn C",
      avatar: "https://i.pravatar.cc/150?img=3",
      content: "Ai có đề cương môn Toán rời rạc không nhỉ?",
      image: "https://i.pravatar.cc/",
      timestamp: "2025-05-04T14:15:00",
      likes: 1,
      liked: false,
      comments: [
        { user: "Nguyễn Văn A", text: "Hay quá!" },
        { user: "Trần Thị B", text: "Đi luôn anh ơi!" }
      ]
    }
  ]);

  const [newPost, setNewPost] = useState("");
  const [newImage, setNewImage] = useState("");

  const handlePost = () => {
    if (newPost.trim() !== "") {
      const post = {
        id: posts.length + 1,
        author: "Bạn",
        avatar: "https://i.pravatar.cc/150?img=4",
        content: newPost,
        image: newImage,
        timestamp: new Date().toISOString(),
        likes: 0,
        liked: false,
        comments: []
      };
      setPosts([post, ...posts]);
      setNewPost("");
      setNewImage("");
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? {
            ...post,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
            liked: !post.liked
          }
        : post
    ));
  };

  const handleComment = (postId, commentText) => {
    const comment = {
      user: "Bạn",
      text: commentText
    };
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, comments: [...post.comments, comment] }
        : post
    ));
  };

  const CommentForm = ({ onSubmit }) => {
    const [comment, setComment] = useState("");
    const handleSubmit = () => {
      if (comment.trim()) {
        onSubmit(comment);
        setComment("");
      }
    };
    return (
      <div className="comment-form">
        <input
          type="text"
          placeholder="Viết bình luận..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={handleSubmit}>Gửi</button>
      </div>
    );
  };

  return (
    <div className='home-newfeed'>
      <div className='home-newfeed-container'>
        <div className="newfeed-container">
          <div className="post-form">
            <div className="post-form-header">
              <img src="https://i.pravatar.cc/150?img=4" alt="avatar" className="avatar" />
              <textarea
                placeholder="Bạn đang nghĩ gì?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              />
            </div>
            {newImage && (
    <div className="preview-image-container">
      <img src={newImage} alt="Ảnh xem trước" className="preview-image" />
    </div>
  )}
            <div className="image-upload">
  <label htmlFor="imageInput" className="image-upload-btn">
    🖼️ Thêm ảnh
  </label>
  <input type="file" id="imageInput"accept="image/*" style={{ display: "none" }}onChange={(e) => { const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }}
  />
  {newImage && <span className="image-preview">Đã thêm ảnh ✔️</span>}
  <button className='img-btn' onClick={handlePost}>Đăng bài</button>
</div>

            
          </div>
          {posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="post-header">
                <img src={post.avatar} alt="avatar" className="avatar" />
                <div>
                  <strong className="author">{post.author}</strong>
                  <div className="timestamp">
                    {new Date(post.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="post-content">{post.content}</div>
              {post.image && (
                <img src={post.image} alt="Ảnh bài viết" className="post-image" />
              )}
              <div className="post-actions">
                <button
                  className={post.liked ? 'liked' : ''}
                  onClick={() => handleLike(post.id)}
                >
                  {post.liked ? '❤️ Đã thích' : '👍 Thích'} ({post.likes})
                </button>
              </div>
              <div className="comments">
                <strong>Bình luận:</strong>
                {post.comments.map((cmt, i) => (
                  <div key={i} className="comment">
                    <strong>{cmt.user}:</strong> {cmt.text}
                  </div>
                ))}
                <CommentForm onSubmit={(comment) => handleComment(post.id, comment)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
