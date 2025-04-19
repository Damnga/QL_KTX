import React, { useState } from 'react';
import './Post.css';
import Header_admin from '../../component/Header_admin/Header_admin';
import Calendar from '../../component/Calendar/Calendar';

const Post = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      tenNguoiDang: 'Xemesis',
      thoiGian: '3 giờ trước',
      noiDung: 'Vua chúa cũng chỉ tới mức này thôi 😩',
      anh: '/images/hienmau.png',
      luotThich: 147,
      binhLuan: 147,
      showCommentBox: false,
      likedBy: ['PewPew', 'Admin'],
      commenters: ['Xemesis', 'PewPew'],
      liked: false // Thêm trường liked để theo dõi trạng thái like
    },
    {
      id: 2,
      tenNguoiDang: 'PewPew',
      thoiGian: '1 giờ trước',
      noiDung: 'Ngủ đúng kiểu anh em 🤣',
      anh: '/images/vnpt.png',
      luotThich: 220,
      binhLuan: 66,
      showCommentBox: false,
      likedBy: ['Xemesis'],
      commenters: ['PewPew'],
      liked: false // Thêm trường liked để theo dõi trạng thái like
    }
  ]);

  const [commentText, setCommentText] = useState('');
  const [showLikes, setShowLikes] = useState(null);
  const [showComments, setShowComments] = useState(null);

  const handleLike = (id) => {
    setPosts(posts.map(post =>
      post.id === id ? {
        ...post, 
        luotThich: post.luotThich + (post.liked ? -1 : 1), 
        likedBy: post.liked ? post.likedBy.slice(0, -1) : [...post.likedBy, 'Bạn'],
        liked: !post.liked // Đảo ngược trạng thái liked
      } : post
    ));
  };

  const toggleCommentBox = (id) => {
    setPosts(posts.map(post =>
      post.id === id ? { ...post, showCommentBox: !post.showCommentBox } : post
    ));
  };

  const handleAddComment = (id) => {
    if (commentText.trim() === '') return;
    setPosts(posts.map(post =>
      post.id === id
        ? {
            ...post, 
            binhLuan: post.binhLuan + 1, 
            showCommentBox: false,
            commenters: [...post.commenters, 'Bạn']
          }
        : post
    ));
    setCommentText('');
  };

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: posts.length + 1,
      tenNguoiDang: 'Bạn',
      thoiGian: 'Vừa xong',
      noiDung: content,
      anh: image,
      luotThich: 0,
      binhLuan: 0,
      chiaSe: 0,
      showCommentBox: false,
      likedBy: [],
      commenters: [],
      liked: false
    };
    setPosts([newPost, ...posts]);
    setTitle('');
    setContent('');
    setImage('');
  };

  return (
    <div className='post'>
      <div className="container">
        <Header_admin />
        <h2>Bài Viết Gần Đây</h2>
        <div className='content'>
          <div className="trang-bai-viet">
            {posts.map((bai) => (
              <div className="bai-viet" key={bai.id}>
                <div className="tieu-de">
                  <img src={`https://i.pravatar.cc/40?u=${bai.tenNguoiDang}`} className="avatar" alt="avatar" />
                  <div>
                    <p className="ten">{bai.tenNguoiDang}</p>
                    <p className="thoi-gian">{bai.thoiGian}</p>
                  </div>
                </div>

                <p className="noi-dung">{bai.noiDung}</p>

                {bai.anh && <img src={bai.anh} alt="ảnh bài viết" className="anh-bai-viet" />}

                <div className="tuong-tac">
                  <p>
                    {bai.luotThich} lượt thích • {bai.binhLuan} bình luận 
                  </p>
                  <div className="nut">
                    <button 
                      className={bai.liked ? "liked" : ""} 
                      onClick={() => handleLike(bai.id)}
                    >
                      👍 Thích
                    </button>
                    <button onClick={() => toggleCommentBox(bai.id)}>💬 Bình luận</button>
                  </div>
                  {bai.showCommentBox && (
                    <div className="comment-box">
                      <input
                        type="text"
                        placeholder="Nhập bình luận..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                      <button onClick={() => handleAddComment(bai.id)}>Gửi</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className='right'>
            <Calendar />
            <div className="editor-container">
              <h2>Tạo mới</h2>
              <form className="editor-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Tiêu đề bài viết"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  placeholder="Nội dung bài viết..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                />
                <input
                  type="text"
                  placeholder="Link ảnh (tuỳ chọn)"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
                <button type="submit">Đăng bài</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
