import React, { useState } from 'react';
import "./Noti.css";

const notifications = [
  {
    id: 1,
    user: "Tài",
    time: "07/05/2025 - 14:30",
    message: "Bạn có một tin nhắn mới từ hệ thống. Hãy kiểm tra ngay trong phần hộp thư của bạn để đảm bảo không bỏ lỡ bất kỳ thông tin quan trọng nào.",
  },
  {
    id: 2,
    user: "Admin",
    time: "07/05/2025 - 13:10",
    message: "Tài khoản của bạn đã được xác minh thành công. Cảm ơn bạn đã hoàn tất quá trình xác thực.",
  },
  {
    id: 3,
    user: "Tài",
    time: "06/05/2025 - 09:45",
    message: "Có một cập nhật quan trọng bạn cần xem. Vui lòng truy cập trang thông báo để xem chi tiết về thay đổi trong điều khoản dịch vụ.",
  },
  {
    id: 3,
    user: "Tài",
    time: "06/05/2025 - 09:45",
    message: "Có một cập nhật quan trọng bạn cần xem. Vui lòng truy cập trang thông báo để xem chi tiết về thay đổi trong điều khoản dịch vụ.",
  },
  {
    id: 3,
    user: "Tài",
    time: "06/05/2025 - 09:45",
    message: "Có một cập nhật quan trọng bạn cần xem. Vui lòng truy cập trang thông báo để xem chi tiết về thay đổi trong điều khoản dịch vụ.",
  },
  {
    id: 3,
    user: "Tài",
    time: "06/05/2025 - 09:45",
    message: "Có một cập nhật quan trọng bạn cần xem. Vui lòng truy cập trang thông báo để xem chi tiết về thay đổi trong điều khoản dịch vụ.",
  },
];

const Noti = () => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className='noti'>
      <div className="noti-container">
        {notifications.map((item) => {
          const isExpanded = expanded[item.id];
          return (
            <div className="noti-content" key={item.id}>
              <div className="noti-header">
                <span className="noti-user">{item.user}</span>
                <span className="noti-time">{item.time}</span>
              </div>
              <p className={`noti-text ${isExpanded ? "expanded" : "clamped"}`}>
                {item.message}
              </p>
              <button className="noti-button" onClick={() => toggleExpand(item.id)}>
                {isExpanded ? "Ẩn bớt" : "Xem thêm"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Noti;
