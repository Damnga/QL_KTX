![image](https://github.com/user-attachments/assets/edca9ca3-6eee-4f9a-ad14-e130b9ba5af7)# 🏢 Hệ thống Quản lý Ký túc xá (KTX)

Đây là dự án xây dựng hệ thống **Quản lý Ký túc xá** nhằm hỗ trợ Ban quản lý trong việc quản lý thông tin sinh viên, phòng ở, quá trình đăng ký, bảo trì, vi phạm nội quy, và các tác vụ liên quan một cách hiệu quả, nhanh chóng và chính xác.

## 📌 Tính năng chính

- ✅ Quản lý sinh viên (thêm, sửa, xoá, xem chi tiết)
- ✅ Quản lý phòng ở, loại phòng, tòa nhà
- ✅ Quản lý đăng ký ở KTX cho sinh viên
- ✅ Quản lý phản hồi, bảo trì phòng
- ✅ Quản lý người thân và lịch thăm
- ✅ Ghi nhận vi phạm và quá trình ra/vào ký túc xá
- ✅ Đăng nhập / Đăng xuất (Admin / Sinh viên)
- ✅ Thống kê số lượng sinh viên, phòng trống, báo cáo Excel
- ✅ Giao diện đẹp, dễ sử dụng, hỗ trợ responsive
- ✅ Thanh toán hóa đơn bằng mã 

## ⚙️ Công nghệ sử dụng

| Thành phần     | Công nghệ                                   |
|----------------|---------------------------------------------|
| Frontend       | React.js, CSS thuần          |
| Backend        | Node.js (Express), MySQL                    |
| API giao tiếp  | RESTful API                                 |
| Xác thực       | JWT + Session (tuỳ chọn)                    |
| Import/Export  | ExcelJS hoặc SheetJS (xlsx)                 |

## 🏗️ Kiến trúc hệ thống

- ✨ Mô hình MVC tách biệt rõ ràng
- 📂 Tổ chức code: `controler`, `model`, `route`, `service`, `middleware`
- 🔐 Bảo mật API với JWT và phân quyền người dùng

## 🚀 Hướng dẫn chạy dự án

### 1. Cài đặt Backend
cd server
npm install
# Khởi chạy server
npm start

tài khoản admin :admin@gmail.com
mk:1
tài khoản sinh viên : nga2@gmail.com
mk:1


### 2. Cài đặt Frontend
cd client
npm install
# Khởi chạy frontend
npm start
