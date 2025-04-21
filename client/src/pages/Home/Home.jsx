import React,{useState} from 'react'
import "./Home.css"
import Chatlist from '../../component/Chatlist/Chatlist'
import Chatwindow from '../../component/Chatwindow/Chatwindow'
const Home = () => {
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
    <div className='home'>
        <div className="post-form-v2">
      <div className="top-row">
        <img src="/images/ne.png" alt="avatar" />
        <input type="text" placeholder="Share some what you are thinking?" />
      </div>
      <div className="icon-row">
        <i>🎵</i>
        <i>🖼</i>
        <i>📹</i>
        <i>📷</i>
      </div>
      <div className="button-row">
        <div></div>
        <button className="post-btn">ĐĂNG BÀI</button>
      </div>
    
        </div>
        <div className="home-post">
          <div className="trangbaiviet">
            {posts.map((bai) => (
              <div className="baiviet" key={bai.id}>
                <div className="tieude">
                  <img src={`https://i.pravatar.cc/40?u=${bai.tenNguoiDang}`} className="avatar" alt="avatar" />
                  <div>
                    <p className="ten">{bai.tenNguoiDang}</p>
                    <p className="thoigian">{bai.thoiGian}</p>
                  </div>
                </div>

                <p className="noidung">{bai.noiDung}</p>

                {bai.anh && <img src={bai.anh} alt="ảnh bài viết" className="anhbaiviet" />}

                <div className="tuongtac">
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
                    <div className="commentbox">
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
        </div>
    </div>
  )
}

export default Home