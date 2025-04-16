import React from "react";
import "./Stepprogress.css";

const steps = [
  "Thông tin sinh viên",
  "Thông tin phía gia đình",
  "Thời gian đăng ký ở ký túc xá",
  "Chọn phòng",
  "Kiểm tra lại thông tin đăng ký",
  "Trả kết quả đăng ký",
];

const Stepprogress = ({ currentStep }) => {
  return (
    <div className="step-progress-container">
      <div className="step-line-background" />
      <div className="step-line-active" style={{ width:`${currentStep * 350}px` }}/>
      <div className="step-items">
        {steps.map((step, index) => (
          <div className="step-item" key={index}>
            <div className={`step-circle ${index === currentStep ? "active" : ""}`}>
              {index === currentStep ? "✓" : index + 1}
            </div>
            <div className={`step-label ${index === currentStep ? "active" : "" }`}>
              {step}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepprogress;
