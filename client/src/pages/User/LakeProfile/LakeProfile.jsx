import React, { useState } from 'react';
import "./LaKeProfile.css";

const LakeProfile = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="profile-infor">
            <img src="https://i.pravatar.cc/" alt="Avatar" className="profile-avatar"/>
            <h4 className="profile-id">NV657912333</h4>
            <p className="profile-status">Đang làm việc</p>
            <div className="info">
              <p><strong>ĐÀM THỊ NGA</strong></p>
              <p>📁 Phòng Nhân Sự</p>
              <p>👨‍💼 Nhân viên hành chính</p>
              <p>📞 0987654321</p>
              <p>🎂 12/05/2001</p>
              <p>👤 Nam</p>
            </div>
            <div className="join-date">
              <p className="label">Ngày vào làm</p>
              <p className="date">01/01/2020</p>
            </div>
          </div>
        </div>

        <div className="profile-component">
          <div
            className={`infor-component ${expanded ? "expanded" : ""}`}
            onClick={toggleExpand}
          >
            Thông tin sinh viên
            {expanded && (
              <div className="expand-content">
                <p>- MSSV: 123456789</p>
                <p>- Ngành: Công nghệ thông tin</p>
                <p>- Lớp: DHTH19A</p>
                <div className="expand-buttons">
                <button
                      className="expand-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("Chỉnh sửa");
                      }}
                    >
                      Chỉnh sửa
                    </button>
                  </div>
              </div>
            )}
          </div>

          <div className="contract-component">Thông tin hợp đồng</div>
          <div className="bill-component">Thông tin hóa đơn</div>
          <div className="service-component">Thông tin dịch vụ</div>
          <div className="support-component">Góp Ý - Phản Hồi</div>
          <div className="relative-component">Người thân</div>
          <div className="history-component">Lịch Sử Ra / Vào</div>
        </div>
      </div>
    </div>
  );
};

export default LakeProfile;
