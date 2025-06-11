import React,{useEffect,useState} from 'react'
import "./Posttab.css";
import {createBaiViet, getAllBaiVietData, editBaiViet, removeBaiViet} from "../../../routes/baiviet";
import { createTuongTac, removeTuongTac,  getAllTuongTac,} from '../../../routes/tuongtac';
import { createBinhLuan, getAllBinhLuan,} from '../../../routes/binhluan';
import Header_admin from "../../../component/Header_admin/Header_admin";
import { toast } from 'react-toastify';
import {jwtDecode }from 'jwt-decode';
const Posttab = () => {
  const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const userId = decoded.id; 
    const [loading, setLoading] = useState(true);
    const [isEditModalOpenBaiViet, setIsEditModalOpenBaiViet] = useState(false);
    const [editingBaiViet, setEditingBaiViet] = useState(null);
    const [showDeleteConfirmBaiViet, setShowDeleteConfirmBaiViet] = useState(false);
    const [roomToDeleteBaiViet, setRoomToDeleteBaiViet] = useState(null);
    const [isAddModalOpenBaiViet, setIsAddModalOpenBaiViet] = useState(false); 
    const [BaiVietListData, setBaiVietListData] = useState([]);
    const [baiviet,setbaiviet]=useState(false);
    const [post,setpost]=useState(true);

    const userAvata = decoded.anh;
    const username = decoded.Username;
    const [tuongTacList, setTuongTacList] = useState([]);
    const [binhLuanList, setBinhLuanList] = useState([]);
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
  const baivietpost = ()=>{
    setbaiviet(!baiviet);
    setpost(!post);
  }

    const handleDeleteBaiViet = (room) => {
        setRoomToDeleteBaiViet(room);
        setShowDeleteConfirmBaiViet(true);
      };
    const confirmDeleteBaiViet = async () => {
        try {
          await removeBaiViet(roomToDeleteBaiViet.id, token);
          const updated = await getAllBaiVietData(token);
          setBaiVietListData(updated);
          toast.success('Xóa thành công');
        } catch (err) {
          toast.error('Thất bại');
        } finally {
          setShowDeleteConfirmBaiViet(false);
          setRoomToDeleteBaiViet(null);
        }
      };
    const cancelDeleteBaiViet = () => {
        setShowDeleteConfirmBaiViet(false);
        setRoomToDeleteBaiViet(null);
      };
    const handleEditBaiViet = (room) => {
        setEditingBaiViet(room);
        setIsEditModalOpenBaiViet(true);
      };
    const handleSaveEditBaiViet = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn lưu thay đổi không?')) return;
    try {
        await editBaiViet(editingBaiViet.id, { 
            NoiDung: editingBaiViet.NoiDung,
            anh: editingBaiViet.anh,
        }, token);
        const updated = await getAllBaiVietData(token);
        setBaiVietListData(updated);
        setIsEditModalOpenBaiViet(false);
        setEditingBaiViet(null);
        toast.success('Thành công');
    } catch (err) {
        toast.error(err?.error || 'Có lỗi xảy ra!');
    }
};
    const handleCloseEditBaiViet = () => {
        setIsEditModalOpenBaiViet(false);
        setEditingBaiViet(null);
      };
    const handleCloseAddBaiViet = () => {
        setIsAddModalOpenBaiViet(false);
        setEditingBaiViet(null);
      };
    const handleCreateBaiViet = async () => {
        if (!window.confirm('Bạn có chắc muốn thêm mới bài viết này không?')) return;
        try {
          await createBaiViet(editingBaiViet);
          const updated = await getAllBaiVietData(token);
          setBaiVietListData(updated);
          setIsAddModalOpenBaiViet(false);
          setEditingBaiViet(null);
           toast.success('Thành công');
        } catch (err) {
          toast.error(err?.error || 'Có lỗi xảy ra!');
        }
      };
    useEffect(() => {
        const fetchBaiViet = async () => {
          try {
            const datalist = await getAllBaiVietData(token);
            setBaiVietListData(datalist);
          } catch (err) {
            console.error('Lỗi khi tải danh sách:', err);
          } finally {
            setLoading(false);
          }
        };
        fetchBaiViet();
      }, [token]);

  return (
    <div className='eventpost'>
      <div className="eventpost_container">
        <Header_admin />
       <div >
        <div className="top-bar">
         <button className='a' onClick={baivietpost}>Quản lý bài viết</button>
       </div>
       {baiviet &&
       <div className="room_table">
         <table>
           <thead>
             <tr>
               <th>STT</th>
               <th>Nội Dung</th>
               <th>Ảnh</th>
               <th>Người đăng</th>
               <th>Thời gian</th>
               <th>Số Lượt tương tác</th>
               <th>Số Bình Luận</th>
               <th colSpan="2">Chức Năng</th>
             </tr>
            </thead>
           <tbody>
             {BaiVietListData.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.NoiDung}</td>
                <td><img src={`http://localhost:3000/uploads/${row.anhbaiviet}`} alt="Ảnh sinh viên"  style={{ width: '80px', height: '60px', objectFit: 'cover' }} /></td>
                <td>{row.Username}</td>
                <td>{new Date(row.Tgian).toLocaleDateString('vi-VN')}</td>
                <td>{row.SoLuotLike}</td>
                <td>{row.SoLuotBinhLuan}</td>
                <td><button className='a' onClick={() => handleEditBaiViet(row)}>Sửa</button></td>
                <td><button className='a' onClick={() => handleDeleteBaiViet(row)}>Xóa</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>}
      {showDeleteConfirmBaiViet && (
        <div className="modal">
          <div className="modal-content">
            <h3>Bạn có chắc chắn muốn xóa  không?</h3>
            <button className='a-btn' onClick={confirmDeleteBaiViet}>Xóa</button>
            <button className='a-btn' onClick={cancelDeleteBaiViet}>Hủy</button>
          </div>
        </div>
      )}
      {isEditModalOpenBaiViet && (
        <div className="modal">
          <div className="modal-content">
            <h3>Sửa thông tin bài viết</h3>
            <label>Nội Dung: </label>
            <input type="text" value={editingBaiViet.NoiDung} onChange={(e) => setEditingBaiViet({ ...editingBaiViet, NoiDung: e.target.value })} /><br/>
            <label>Ảnh:</label>
            <input type="file" onChange={(e) => setEditingBaiViet({ ...editingBaiViet, anh: e.target.files[0] })} /><br/>
            <button className='a' onClick={handleSaveEditBaiViet}>Lưu</button>
            <button className='a' onClick={handleCloseEditBaiViet}>Thoát</button>
          </div>
        </div>
      )}
      {isAddModalOpenBaiViet && (
        <div className="modal">
          <div className="modal-content">
            <h3>Thêm Thông Tin Sự kiện</h3>
            <label>Nội Dung: </label>
            <input type="text" value={editingBaiViet.NoiDung} onChange={(e) => setEditingBaiViet({ ...editingBaiViet, NoiDung: e.target.value })} /><br/>
            <label>Ảnh:</label>
            <input type="file" onChange={(e) => setEditingBaiViet({ ...editingBaiViet, anh: e.target.files[0] })} /><br/>
            <button className='a' onClick={handleCreateBaiViet}>Lưu</button>
            <button className='a' onClick={handleCloseAddBaiViet}>Thoát</button>
          </div>
        </div>
      )}
      {post &&<div className="newfeed-container">
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
      </div>}
      </div>
      </div>
    </div>
  )
}

export default Posttab