import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http'; 
import { Server } from 'socket.io';
import {errorHandler} from "./middleware/errorHandler.js";
import taikhoanRoute from "./route/taikhoan.js";
import phongRoute from "./route/Phong.js";
import toanhaRoute from "./route/Toanha.js";
import loaiphongRoute from "./route/LoaiPhong.js";
import hoadonRoute from "./route/HoaDon.js";
import chitiethoadonRoute from "./route/ChiTietHoaDon.js";
import hosoRoute from "./route/HoSo.js";
import hopdongRoute from "./route/HopDong.js";
import dichvuRoute from "./route/DichVu.js";
import chitietdichvuRoute from "./route/ChiTietDichVu.js";
import hoadondichvuRoute from "./route/HoaDonDichVu.js";
import nguoithanRoute from "./route/NguoiThan.js";
import sinhvienRoute from "./route/SinhVien.js";
import lichsuravaoRoute from "./route/LichSuRaVao.js";
import kyluatRoute from "./route/KyLuat.js";
import gopyRoute from "./route/GopYRoute.js";
import phanquyenRoute from "./route/PhanQuyen.js";
import thongbaoRoute from "./route/ThongBao.js";
import tinnhanRoute from "./route/TinNhan.js";
import binhluanRoute from "./route/BinhLuan.js";
import tuongtacRoute from "./route/TuongTac.js";
import baivietRoute from "./route/BaiViet.js";
import sukienRoute from "./route/SuKien.js";
import thamgiasukienRoute from "./route/ThamGiaSuKien.js";
import dangkythamRoute from "./route/DangKyTham.js";
import baotriRoute from "./route/BaoTri.js";
import thanhtoan from "./route/payment.js";
import {updateRoomStatusJob,updateContractStatus,updateEventStatusJob} from "./config/cron.js";
import {backupImages}  from "./backup.js";
import cron from 'node-cron';
import chat from './route/openai.js';
import dangky from './route/Dangky.js';
dotenv.config();
const app = express();
updateRoomStatusJob();
updateContractStatus();
updateEventStatusJob();
cron.schedule('0 0 * * *', async () => {
  console.log('[⏰] Backup mỗi ngày lúc 00:00');
  try {
    await backupImages();
    console.log('Backup success');
  } catch (err) {
    console.error('Backup failed:', err);
  }
});
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(`✅ User ${userId} online`);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      io.to(sendUserSocket).emit("msg-receive", {
        from: data.from,
        message: data.message,
      });
    }
  });

  socket.on("ask-ai", async (message) => {
    try {
      const reply = await askOpenAI(message);
      socket.emit("ai-reply", { content: reply });
    } catch (error) {
      console.error("❌ AI error:", error.message);
      socket.emit("ai-reply", { content: "Lỗi AI. Vui lòng thử lại." });
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
    for (let [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        console.log(`❌ User ${userId} offline`);
        break;
      }
    }
  });
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(session({
  secret: 'secret-session',
  resave: false,
  saveUninitialized: true,
}));
app.use('/', taikhoanRoute);
app.use('/thanh_toan',thanhtoan);
app.use('/phong', phongRoute);
app.use('/toa_nha', toanhaRoute);
app.use('/loai_phong', loaiphongRoute);
app.use('/hoa_don', hoadonRoute);
app.use('/chi_tiet_hoa_don', chitiethoadonRoute);
app.use('/ho_so', hosoRoute);
app.use('/hop_dong', hopdongRoute);
app.use('/dich_vu',dichvuRoute);
app.use('/chi_tiet_dich_vu',chitietdichvuRoute);
app.use('/hoa_don_dich_vu',hoadondichvuRoute);
app.use('/nguoi_than',nguoithanRoute);
app.use('/sinh_vien',sinhvienRoute);
app.use('/lich_su_ra_vao',lichsuravaoRoute);
app.use('/ky_luat',kyluatRoute);
app.use('/gop_y',gopyRoute);
app.use('/phan_quyen',phanquyenRoute);
app.use('/thong_bao',thongbaoRoute);
app.use('/tin_nhan',tinnhanRoute);
app.use('/binh_luan',binhluanRoute);
app.use('/tuong_tac',tuongtacRoute);
app.use('/bai_viet',baivietRoute);
app.use('/su_kien',sukienRoute);
app.use('/tham_gia_su_kien',thamgiasukienRoute);
app.use('/dang_ky_tham',dangkythamRoute);
app.use('/bao_tri',baotriRoute);
app.use('/openai',chat);
app.use('/dang_ky',dangky);
app.use(errorHandler);
const PORT = 3000;
server.listen(PORT, () => console.log(`http://172.20.10.7:${PORT}`));
export {io};