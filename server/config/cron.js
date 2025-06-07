import cron from "node-cron";
import db from "./database.js";
import nodemailer from "nodemailer";
import Twilio from "twilio";
import dotenv from 'dotenv';
dotenv.config();
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'damthinga1953@gmail.com',
    pass: 'kpkd dlqa ficc avqa',
  }
});

const twilioClient = new Twilio(process.env.TWILIO_SID,process.env.TWILIO_AUTH_TOKEN);
const twilioFromNumber = '+14433516998'; 


export const updateContractStatus = async () => {
  try {
    const today = new Date();
    const next7Days = new Date();
    next7Days.setDate(today.getDate() + 7);

    const [contractsSoonToExpire] = await db.execute(`
      SELECT hopdong.id, Email, SDT, NgayKetThuc ,hopdong.TrangThai 
      FROM hopdong,sinhvien
      WHERE hopdong.MaSV = sinhvien.id and hopdong.TrangThai NOT IN ('Hết hạn', 'Sắp hết hạn')
        AND NgayKetThuc BETWEEN ? AND ?
    `, [today.toISOString().split('T')[0], next7Days.toISOString().split('T')[0]]);

    const [updateResult] = await db.execute(`
      UPDATE hopdong
      SET TrangThai = 'Sắp hết hạn'
      WHERE TrangThai NOT IN ('Hết hạn', 'Sắp hết hạn')
        AND NgayKetThuc BETWEEN ? AND ?
    `, [today.toISOString().split('T')[0], next7Days.toISOString().split('T')[0]]);

    for (const contract of contractsSoonToExpire) {
      const mailOptions = {
        from: 'damthinga1953@gmail.com',
        to: contract.Email,
        subject: 'Thông báo hợp đồng sắp hết hạn',
        text: `Hợp đồng của bạn sẽ hết hạn vào ngày ${new Date(contract.NgayKetThuc).toLocaleDateString('vi-VN')}. Vui lòng kiểm tra và gia hạn nếu cần.`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(`Lỗi gửi email hợp đồng id ${contract.id}:`, error);
        } else {
          console.log(`Email đã gửi cho hợp đồng id ${contract.id}:`, info.response);
        }
      });

      try {
        await twilioClient.messages.create({
          body: `Hợp đồng của bạn sẽ hết hạn vào ngày ${new Date(contract.NgayKetThuc).toLocaleDateString('vi-VN')}. Vui lòng gia hạn kịp thời.`,
          from: twilioFromNumber,
          to: contract.SDT.startsWith('+') ? contract.SDT : `+84${contract.SDT.slice(1)}`,

        });
        console.log(`SMS đã gửi cho hợp đồng id ${contract.id} đến số ${contract.SDT}`);
      } catch (smsError) {
        console.error(`Lỗi gửi SMS hợp đồng id ${contract.id}:`, smsError);
      }
    }

    const [expired] = await db.execute(`
      UPDATE hopdong
      SET TrangThai = 'Hết hạn'
      WHERE TrangThai != 'Hết hạn' 
        AND NgayKetThuc < ?
    `, [today.toISOString().split('T')[0]]);

    console.log(`[Cron] Đã cập nhật ${updateResult.affectedRows} sắp hết hạn, ${expired.affectedRows} đã hết hạn`);
  } catch (error) {
    console.error('[Cron] Lỗi cập nhật trạng thái:', error);
  }
};
cron.schedule('0 0 * * *', updateContractStatus);


export const updateRoomStatusJob =async () => {
    try {
      const [rooms] = await db.query('SELECT MaPhong, SoNguoi FROM phong,loaiphong where phong.MaLoai = loaiphong.MaLoai');
      for (const room of rooms) {
        const [residents] = await db.query(
          'SELECT COUNT(*) AS soLuong FROM hopdong WHERE MaPhong = ?',
          [room.MaPhong]
        );
        const soLuongHienTai = residents[0].soLuong;
        let trangThai = 'Trống';
        if (soLuongHienTai === 0) {
          trangThai = 'Trống';
        } else if (soLuongHienTai < room.SoNguoi) {
          trangThai = 'Còn chỗ';
        } else {
          trangThai = 'Đã đầy';
        }
        await db.query('UPDATE phong SET TrangThai = ? WHERE MaPhong = ?', [
          trangThai,
          room.MaPhong,
        ]);
      }
    } catch (err) {
      console.error('Lỗi cập nhật trạng thái phòng:', err);
    }
};
setInterval(updateRoomStatusJob, 1000);


export const updateEventStatusJob = async () => {
  try {
    const [events] = await db.query('SELECT sukien.id, TgianBatDau, TgianKetThuc FROM sukien');

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const fiveDaysLater = new Date(today);
    fiveDaysLater.setDate(today.getDate() + 5);

    for (const event of events) {
      const start = new Date(event.TgianBatDau);
      const end = new Date(event.TgianKetThuc);

      let status = 'Chưa đến';

      if (end < today) {
        status = 'Đã diễn ra';
      } else if (start <= today && today <= end) {
        status = 'Đang diễn ra';
      } else if (start <= fiveDaysLater) {
        status = 'Sắp diễn ra';
      }
      await db.query('UPDATE sukien SET TrangThai = ? WHERE id = ?', [
        status,
        event.id,
      ]);
    }
  } catch (err) {
    console.error('🔥 Lỗi cập nhật trạng thái sự kiện:', err);
  }
};
setInterval(updateEventStatusJob, 10000);
