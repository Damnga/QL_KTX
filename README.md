# 🏠 Hệ thống Quản lý Ký túc xá Sinh viên

Phần mềm Quản lý Ký túc xá giúp Ban quản lý và sinh viên dễ dàng thực hiện các nghiệp vụ liên quan đến việc đăng ký ở, quản lý phòng, xử lý phản hồi – tất cả trong một hệ thống đồng bộ giữa Web và Mobile App.

---

## 🧩 Tổng quan hệ thống

- 🖥️ **Web app (Quản lý, Admin)**: ReactJS
- 📱 **Mobile app (Sinh viên)**: React Native (Expo)
- 🧠 **Backend**: Node.js (Express)
- 🛢️ **Database**: MySQL
- 🔐 **Xác thực & phân quyền**: JWT
- 🔁 **Giao tiếp**: RESTful API
- 📦 **Realtime (tùy chọn)**: Socket.IO (cho chat, thông báo)
- 📄 **Xuất dữ liệu**: ExcelJS hoặc SheetJS

---

## 📌 Tính năng chính

### 🎓 Sinh viên:
- Đăng ký ở KTX nhiều bước (nhập thông tin → chọn phòng → ký hợp đồng)
- Xem thông tin cá nhân, phòng, và thành viên phòng
- Gửi yêu cầu sửa chữa, góp ý, xem lịch sử xử lý
- Đăng ký người thân đến thăm
- Xem lịch sử ra vào (tích hợp RFID)
- Tra cứu và thanh toán hóa đơn
- Đăng xuất hệ thống

### 🛠️ Ban quản lý:
- Quản lý sinh viên, tòa nhà, phòng, loại phòng
- Xét duyệt yêu cầu ở, yêu cầu sửa chữa, lịch thăm
- Theo dõi vi phạm nội quy và xử lý
- Quản lý hóa đơn, xuất báo cáo ra file Excel
- Thống kê tổng hợp theo từng khu/tòa

---

## ⚙️ Công nghệ sử dụng

| Thành phần      | Công nghệ sử dụng                |
|------------------|----------------------------------|
| Frontend Web     | ReactJS, React Router, Context API |
| Mobile App       | React Native (Expo), AsyncStorage |
| Backend API      | Node.js, Express, JWT, bcrypt     |
| Cơ sở dữ liệu    | MySQL                            |
| File Upload      | Multer                           |
| Export Excel     | ExcelJS / SheetJS (xlsx)         |
| Giao tiếp Realtime| Socket.IO (tuỳ chọn)            |

---

## 🏗️ Kiến trúc hệ thống

- Áp dụng mô hình **MVC** rõ ràng (Model - View - Controller)
- Phân chia module: `routes`, `controllers`, `models`, `services`, `middlewares`
- **RESTful API** cho frontend web và mobile
- Bảo mật bằng **JWT + phân quyền** (Admin / Sinh viên)
- Tối ưu truy vấn dữ liệu với JOIN, SUBQUERY trong MySQL

---

## 🚀 Hướng dẫn chạy dự án

### 📁 1. Backend (Node.js + MySQL)

```bash
cd server
npm install
npm start
🧪 Tài khoản demo:

Admin: admin@gmail.com / 1

Sinh viên: nga2@gmail.com / 1

💻 2. Frontend Web (ReactJS)
bash
Sao chép
Chỉnh sửa
cd client
npm install
npm start
📱 3. Mobile App (React Native)
Yêu cầu cài đặt Expo CLI

bash
Sao chép
Chỉnh sửa
cd mobile
npm install
npx expo start


![image](https://github.com/user-attachments/assets/edca9ca3-6eee-4f9a-ad14-e130b9ba5af7)
![giaodienchinh](https://github.com/user-attachments/assets/93077828-9615-4a65-8daa-6449f4c1889d)
![giaodiendangnhap](https://github.com/user-attachments/assets/1108817d-8e05-4aa7-832a-b2565c04b8d5)
![giaodiennguoidung](https://github.com/user-attachments/assets/9beb63d4-2f7e-454d-918b-7a29675a1a68)
![giaodienquanlyphong](https://github.com/user-attachments/assets/7078ea61-179e-4a13-b6e2-10e1bab51df2)
