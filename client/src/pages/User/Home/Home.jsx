import React, { useEffect, useState } from 'react';
import './Home.css';
import { createBaiViet, getAllBaiVietData } from '../../../routes/baiviet';
import { createTuongTac, removeTuongTac,  getAllTuongTac,} from '../../../routes/tuongtac';
import { createBinhLuan, getAllBinhLuan,} from '../../../routes/binhluan';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

const Home = () => {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const userId = decoded.id;
  const userAvata = decoded.anh;
  const username = decoded.Username;

  const [BaiVietListData, setBaiVietListData] = useState([]);
  const [tuongTacList, setTuongTacList] = useState([]);
  const [binhLuanList, setBinhLuanList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newPost, setNewPost] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await getAllBaiVietData(token);
        const likes = await getAllTuongTac(token);
        const comments = await getAllBinhLuan(token);

        setBaiVietListData(posts);
        setTuongTacList(likes);
        setBinhLuanList(comments);
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);
  const handlePost = async () => {
    if (newPost.trim() === '') {
      toast.error('Bạn chưa nhập nội dung bài viết');
      return;
    }

    const dataToSend = {
      NoiDung: newPost,
      MaTK: userId,
      Tgian: new Date().toISOString(),
      anh: selectedFile,
    };

    try {
      await createBaiViet(dataToSend);
      const updatedPosts = await getAllBaiVietData(token);
      setBaiVietListData(updatedPosts);
      setNewPost('');
      setNewImage(null);
      setSelectedFile(null);
      toast.success('Đăng bài thành công!');
    } catch (error) {
      toast.error('Có lỗi khi đăng bài: ' + error.message);
    }
  };
  const handleLike = async (postId) => {
  try {
    const existing = tuongTacList.find(
      (tt) => tt.MaTK === userId && tt.MaBV === postId
    );

    if (existing) {
      await removeTuongTac(existing.id);
      const updatedLikes = await getAllTuongTac(token);
      setTuongTacList(updatedLikes);
    } else {
      await createTuongTac({
        MaTK: userId,
        MaBV: postId,
        Tgian: new Date().toISOString(),
      });
      const updatedLikes = await getAllTuongTac(token);
      setTuongTacList(updatedLikes);
    }
  } catch (err) {
    toast.error('Lỗi khi xử lý tương tác!');
  }
};
  const handleComment = async (postId, commentText) => {
    if (!commentText.trim()) return;

    const newComment = {
      MaTK: userId,
      MaBV: postId,
      NoiDung: commentText,
      Tgian: new Date().toISOString(),
    };

    try {
      await createBinhLuan(newComment);
      const comments = await getAllBinhLuan(token);
      setBinhLuanList(comments);
      toast.success('Bình luận đã được thêm!');
    } catch (error) {
      toast.error('Lỗi khi gửi bình luận!');
    }
  };
  const CommentForm = ({ onSubmit }) => {
    const [comment, setComment] = useState('');
    const handleSubmit = () => {
      if (comment.trim()) {
        onSubmit(comment);
        setComment('');
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
        <button onClick={handleSubmit}>Bình Luận</button>
      </div>
    );
  };
  return (
    <div className="home-newfeed">
      <div className="home-newfeed-container">
        <div className="newfeed-container">
          <div className="post-form">
            <div className="post-form-header">
              <img
                src={`http://localhost:3000/uploads/${userAvata}`}
                alt="avatar"
                className="avatar"
              />
              <textarea
                value={newPost}
                placeholder={`${username} à bạn đang nghĩ gì thế ?`}
                onChange={(e) => setNewPost(e.target.value)}
              />
            </div>
            {newImage && (
              <div className="preview-image-container">
                <img
                  src={newImage}
                  alt="Ảnh xem trước"
                  className="preview-image"
                />
              </div>
            )}
            <div className="image-upload">
              <label htmlFor="imageInput" className="image-upload-btn">
                🖼️ Thêm ảnh
              </label>
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setSelectedFile(file);
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setNewImage(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              {newImage && (
                <span className="image-preview">Đã thêm ảnh ✔️</span>
              )}
              <button className="img-btn" onClick={handlePost}>
                Đăng bài
              </button>
            </div>
          </div>
          {BaiVietListData.map((post) => {
            const liked = tuongTacList.some(
              (tt) => tt.MaTK === userId && tt.MaBV === post.id
            );
            const likeCount = tuongTacList.filter(
              (tt) => tt.MaBV === post.id
            ).length;

            return (
              <div className="post" key={post.id}>
                <div className="post-header">
                  <img
                    src={`http://localhost:3000/uploads/${post.anhnguoidung}`}
                    alt="avatar"
                    className="avatar"
                  />
                  <div>
                    <strong className="author">{post.Username}</strong>
                    <div className="timestamp">
                      {new Date(post.Tgian).toLocaleDateString('vi-VN')}
                    </div>
                  </div>
                </div>
                <div className="post-content">{post.NoiDung}</div>
                {post.anhbaiviet && (
                  <img
                    src={`http://localhost:3000/uploads/${post.anhbaiviet}`}
                    alt="Ảnh bài viết"
                    className="post-image"
                  />
                )}
                <div className="post-actions">
                  <button
                    className={liked ? 'liked' : ''}
                    onClick={() => handleLike(post.id)}
                  >
                    {liked ? '❤️ Đã thích' : '🤍 Thích'} ({likeCount})
                  </button>
                </div>
                <div className="comments">
                  <strong>Bình luận:</strong>
                  {binhLuanList
                    .filter((cmt) => String(cmt.MaBV) === String(post.id))
                    .map((cmt, i) => (
                      <div key={i} className="comment">
                        <strong>{cmt.Username}:</strong> {cmt.NoiDung}
                      </div>
                    ))}
                  <CommentForm
                    onSubmit={(comment) => handleComment(post.id, comment)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
