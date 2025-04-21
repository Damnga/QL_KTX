import React, { useState } from 'react';
import './Register.css';
import Stepprogress from "../../component/StepProgress/Stepprogress";

const Register = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    account: '',
    name: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
    securityAnswer: '',
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  // Validation từng bước
  const isStepValid = () => {
    switch (step) {
      case 0:
        return formData.account.trim() !== '';
      case 1:
        return formData.name.trim() !== '';
      case 2:
        return formData.email.includes('@') && formData.phone.trim().length >= 9;
      case 3:
        return formData.username && formData.password.length >= 6;
      case 4:
        return formData.password === formData.confirmPassword && formData.securityAnswer.trim() !== '';
      case 5:
        return true;
      default:
        return false;
    }
  };

  return (
    <div >
      <Stepprogress currentStep={step} />

      <div className="step-form">
        {step === 0 && (
          <div>
            <h3>Đăng ký tài khoản</h3>
            <input
              type="text"
              placeholder="Tên tài khoản"
              value={formData.account}
              onChange={handleChange('account')}
            />
          </div>
        )}
        {step === 1 && (
          <div>
            <h3>Thông tin cá nhân</h3>
            <input
              type="text"
              placeholder="Họ tên"
              value={formData.name}
              onChange={handleChange('name')}
            />
          </div>
        )}
        {step === 2 && (
          <div>
            <h3>Thông tin liên hệ</h3>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange('email')}
            />
            <input
              type="text"
              placeholder="Số điện thoại"
              value={formData.phone}
              onChange={handleChange('phone')}
            />
          </div>
        )}
        {step === 3 && (
          <div>
            <h3>Thông tin tài khoản</h3>
            <input
              type="text"
              placeholder="Tên đăng nhập"
              value={formData.username}
              onChange={handleChange('username')}
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange('password')}
            />
          </div>
        )}
        {step === 4 && (
          <div>
            <h3>Thông tin bảo mật</h3>
            <input
              type="password"
              placeholder="Nhập lại mật khẩu"
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
            />
            <input
              type="text"
              placeholder="Câu hỏi bảo mật"
              value={formData.securityAnswer}
              onChange={handleChange('securityAnswer')}
            />
          </div>
        )}
        {step === 5 && (
          <div>
            <h3>Xác nhận thông tin</h3>
            <pre style={{ textAlign: "left" }}>{JSON.stringify(formData, null, 2)}</pre>
          </div>
        )}
      </div>

      <div className="step-buttons">
        <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
          ← Quay lại
        </button>
        <button
          onClick={() => setStep((s) => Math.min(5, s + 1))}
          disabled={!isStepValid()}
        >
          {step === 5 ? 'Hoàn tất' : 'Tiếp →'}
        </button>
      </div>
    </div>
  );
};

export default Register;
