import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  return (
    <div className="login-wrapper">
      <div className={`left-side ${showLogin ? 'shrink' : ''}`}>
        <img src="/images/logo.jpg" alt="Illustration" className="illustration" />
        <h2>TRUNG TÂM QUẢN LÝ KTX<br />PHÁP VÂN - TỨ HIỆP</h2>
        {!showLogin && (
          <button className="start-login-btn" onClick={handleShowLogin}>
            Đăng nhập
          </button>
        )}
      </div>

      <div className={`right-side ${showLogin ? 'slide-in' : ''}`}>
        <h2>ĐĂNG NHẬP</h2>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <div className="options">
          <a href="#">Quên mật khẩu?</a>
        </div>
        <div className="buttons">
          <button className="login-btn">Login</button>
          <button className="register-btn">Register</button>
        </div>
      </div>
    </div>
  );
};

export default Login;


