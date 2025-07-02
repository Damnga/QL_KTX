import { removeVietnameseTones } from "./removeVNtone.js";
import { getSinhVienByMaThe } from "../model/SinhvienModel.js";
import { createLichSuRaVao, getLichSuRaVaoByIdSinhVien } from "../model/LichsuravaoModel.js";
import { io } from "../index.js"; 
export const handleRfidScan = async (req, res) => {
  const uid = req.body.uid;
  if (!uid) return res.status(400).send("UID không được để trống");

  try {
    const result = await getSinhVienByMaThe(uid);

    if (result.length === 0) {
      return res.status(404).send("Không tìm thấy sinh viên");
    }

    const student = result[0];

    await createLichSuRaVao({
      MaSV: student.id,
      LoaiHoatDong: "vao",
      TrangThai: "", 
    });

    const history = await getLichSuRaVaoByIdSinhVien(student.id);
    const nameNoAccent = removeVietnameseTones(student.HoTen);

    io.emit("scanSuccess", {
      student,
      history,
      HoTen: nameNoAccent,
    });

    return res.status(200).json({
      success: true,
      name: nameNoAccent,
    });
  } catch (error) {
    console.error("❌ Lỗi trong handleRfidScan:", error);
    return res.status(500).send("Lỗi máy chủ");
  }
};
