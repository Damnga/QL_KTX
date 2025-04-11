import React from 'react';
import "./Footer.css";
const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer_top_container">
    <div className="footer-top">
      <div className="footer-col">
        <h3>LIÊN HỆ</h3>
        <p><strong>📍Địa chỉ:</strong> Khu nhà ở sinh viên,phường Hoàng Liệt ,quận Hoàng Mai, thành phố Hà Nội.</p>
        <p>☎️1900.1900</p>
        <p>✉️ ktxphapvan@gmail.com</p>
      </div>

      <div className="footer-col">
        <h3>GIỚI THIỆU</h3>
        <p>Về Trung tâm Quản lý Ký túc xá</p>
      </div>
      <div className="footer-col">
        <h3>TỔ CHỨC ĐOÀN THỂ</h3>
        <p>Công đoàn</p>
        <p>Chi đoàn</p>
      </div>
      <div className="footer-col">
        <h3>ĐƠN VỊ TRỰC THUỘC</h3>
        <p>Ban quản lý Tòa nhà A1</p>
        <p>Ban quản lý Tòa nhà A2</p>
        <p>Ban quản lý Tòa nhà A3</p>
        <p>Ban quản lý Tòa nhà A4</p>
        <p>Ban quản lý Tòa nhà A5</p>
        <p>Ban quản lý Tòa nhà A6</p>
      </div>
    </div>
    </div>
    <div className="footer_bottom_container">
    <div className="footer-bottom">
      <div className="footer-bottom-left">
        <p>Bản quyền©2025 thuộc Trung tâm Quản lý Ký túc xá.</p>
        <p>Thiết kế và xây dựng bởi <span className="highlight">Nga Nè</span>.</p>
      </div>
      <div className="footer-bottom-right">
        <p>Theo dõi chúng tôi trên:</p>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
          <a href="https://plus.google.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-google-plus-g"></i></a>
        </div>
      </div>
    </div>
    </div>
    <div className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <i className="fas fa-chevron-up"></i>
      </div>
  </footer>
  )
}
export default Footer
