import React,{useState,useEffect} from 'react'
import "./Header.css";
import {Search} from "lucide-react";
const Header = () => {
    const [showLanguage, setShowLanguage] = useState(false);
    const toggleLanguage = () => {
      setShowLanguage(!showLanguage);
    };
    const texts = [
        "Tìm kiếm sản phẩm...",
        "Tìm kiếm theo mã...",
        "Tìm kiếm theo tên...",
      ];
    const [text, setText] = useState("");
    const [index, setIndex] = useState(0);
    const [char, setChar] = useState(0);
    useEffect(() => {
        const typing = setInterval(() => {
          setText(texts[index].slice(0, char + 1));
          setChar((c) => {
            if (c + 1 === texts[index].length) {
              clearInterval(typing);
              setTimeout(() => {
                setChar(0);
                setIndex((i) => (i + 1) % texts.length);
                setText("");
              }, 1500); 
            }
            return c + 1;
          });
        }, 100);
        return () => clearInterval(typing);
    }, [index, char]);
      
  return (
    <div className="header_container">
      <div className="header">
        <div className="header_left">
        <div className="language_wrapper">
  <span className="language" onClick={toggleLanguage}>Ngôn Ngữ</span>
  {showLanguage && (
    <div className="language_container">
      <p>
        🇻🇳 <img src="https://flagcdn.com/16x12/vn.png"
          srcSet="https://flagcdn.com/32x24/vn.png 2x, https://flagcdn.com/48x36/vn.png 3x"
          width="16" height="12" alt="Vietnam" />
      </p>
      <p>
        🇺🇸 <img src="https://flagcdn.com/16x12/us.png"
          srcSet="https://flagcdn.com/32x24/us.png 2x, https://flagcdn.com/48x36/us.png 3x"
          width="16" height="12" alt="United States" />
      </p>
    </div>
  )}
</div>

          <span className="hotline">Tổng đài: <span className="hotline_number">1900.1900</span></span>
        </div>
        <div className="header_center">
          <a href="#support">Hỗ trợ đăng ký phòng ở</a>
          <a href="#jobs">Việc làm</a>
          <a href="#virtual-tour">Tham quan KTX trực tuyến</a>
        </div>
        <div className="header_right">
          <input type="text" placeholder={text} className="search_bar" />
          <button className="search_button"><Search className="search_button_icon" /></button>
        </div>
      </div>
    </div>
  )
}

export default Header
