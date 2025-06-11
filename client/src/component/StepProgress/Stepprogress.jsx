import React from "react";
import "./Stepprogress.css";

const steps = [
  "Thông tin cá nhân",
  "Giấy tờ cần thiết",
  "Chọn Phòng và thời gian",
  "Hoàn tất",
];

const Stepprogress = ({ currentStep }) => {
  return (
    <div className="step-progress-container">
      <div className="step-line-background" />
     <div
  className="step-line-active"
  style={{
    left: `${100 / (steps.length * 2)}%`,
    width: `${(currentStep / (steps.length - 1)) * (100 - (100 / (steps.length))) }%`,
  }}
/>
      <div className="step-items">
        {steps.map((step, index) => (
          <div className="step-item" key={index}>
            <div
              className={`step-circle ${
                index === currentStep
                  ? "active"
                  : index < currentStep
                  ? "done"
                  : ""
              }`}
            >
              {index < currentStep ? "✓" : index + 1}
            </div>
            <div
              className={`step-label ${
                index === currentStep ? "active" : ""
              }`}
            >
              {step}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepprogress;
