import { View,Alert, Text, ScrollView, Image, TouchableOpacity, Platform , StyleSheet,Modal, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../../route/TaiKhoan'; 
import {getByIdSinhVienUser} from "../../route/SinhVien";
import {getByIdTenPhongTenTN,getByIdTenPhong} from "../../route/Phong";
import {getAllBaoTriPhong,createBaoTri} from "../../route/BaoTri";
import {getByIdTaiKhoan} from "../../route/HopDong";
import {getAllGopYSinhVien,createGopY,editGopY} from "../../route/GopY";
import {getByIdNguoiThanSinhVien} from "../../route/NguoiThan";
import {getByIdDangKyThamSinhVien,createDangKyTham} from "../../route/DangKyTham";
import {getByIdKyLuatSinhVien} from "../../route/KyLuat";
import {getByIdLichSuRaVaoSinhVien} from "../../route/LichSuRaVao";
import {handleThanhToan} from "../../route/ThanhToan";
import { useToast } from 'react-native-toast-notifications';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
export default function ProfileScreen() {
  const toast = useToast();
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userMaSV, setUserMaSV] = useState(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);   
  const [sinhvienuser,setSinhvienuser]=useState({});
  const [tenphongtenTNuser,settenphongtenTNuser]=useState([]);
  const [baotriphong,setbaotriphong]=useState([]);
  const [hoso,sethoso]=useState({});
  const [gopy,setgopy]=useState([]);
  const [openImage, setOpenImage] = useState(null);
  const [nguoithan ,setnguithan]=useState([]);
  const [dangkytham ,setdangkytham]=useState([]);
  const [kyluat,setkyluat]=useState([]);
  const [lichsuravao,setlichsuravao]=useState([]);
  const [maphongbytksinhvien,setmaphongbytksinhvien]=useState({});
  const [showPicker, setShowPicker] = useState(false);
  const [show, setShow] = useState(false);
    const [field, setField] = useState(null);
  const onChange = (event, selectedDate) => {
    if (event.type === 'set') {
      const iso = selectedDate.toISOString().split('T')[0];
      setNoiDungDangKyTham(prev => ({
      ...prev,
      [field]: iso, 
    }));
    }
    setShow(false); 
  };
  useEffect(() => {
  const fetchToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token || token === 'null' || token === 'undefined' || token.trim() === '') {
        toast.show('Token không tồn tại hoặc không hợp lệ!', { type: 'danger' });
        return;
      }
      let decoded;
      try {
        decoded = jwtDecode(token);
      } catch (decodeErr) {
        toast.show('Token lỗi, vui lòng đăng nhập lại!', { type: 'danger' });
        await AsyncStorage.removeItem('token');
        navigation.replace('Login');
        return;
      }
      if (decoded?.id) {
        setUserId(decoded.id);
        setUserMaSV(decoded.MaSV);
      } else {
        toast.show('Token không chứa thông tin người dùng!', { type: 'danger' });
      }
    } catch (error) {
      toast.show('Lỗi không xác định khi xử lý token!', { type: 'danger' });
    }
  };

  fetchToken();
}, []);
    const handleOpenImage = (filePath) => {
     setOpenImage(filePath);
   };
   const handleCloseImage = () => {
     setOpenImage(null);
   };
   const confirmLogout = () => {
  Alert.alert("Xác nhận", "Bạn có chắc chắn muốn đăng xuất không?", [
    { text: "Hủy", style: "cancel" },
    {
      text: "Đăng xuất",
      onPress: () => handleLogout(), 
    },
  ]);
   };
   const handleLogout = async () => {
  try {
    await logout();
    navigation.navigate('Login');
  } catch (err) {
    toast.show('Đã xảy ra lỗi khi đăng xuất', { type: 'danger' });
    console.error(err);
  }
   };
   useEffect(() => {
   const fetchUser = async () => {
     try {
       const sinvienuser = await getByIdSinhVienUser(userId);
       const sinhvienValue = Array.isArray(sinvienuser)
         ? sinvienuser[0]
         : sinvienuser;
       setSinhvienuser(sinhvienValue);
       const tenphongtenTN = await getByIdTenPhongTenTN(sinhvienValue.TenPhong,sinhvienValue.TenTN);
       settenphongtenTNuser(tenphongtenTN);
       const baotri = await getAllBaoTriPhong(sinhvienValue.TenPhong,sinhvienValue.TenTN);
       setbaotriphong(baotri);
       const hosotaikhoan = await getByIdTaiKhoan(userId);
       sethoso(hosotaikhoan);
       const gopysinhvien = await getAllGopYSinhVien(userMaSV);
       setgopy(gopysinhvien);
       const nguoithansinhvien = await getByIdNguoiThanSinhVien(userMaSV);
       setnguithan(nguoithansinhvien);
       const dangkythamnguoithan = await getByIdDangKyThamSinhVien(userMaSV);
       setdangkytham(dangkythamnguoithan);
       const kyluatsinhvien = await getByIdKyLuatSinhVien(userMaSV);
       setkyluat(kyluatsinhvien);
       const lichsuravaosinhvien = await getByIdLichSuRaVaoSinhVien(userMaSV);
       setlichsuravao(lichsuravaosinhvien);
       const maphongsinhvien = await getByIdTenPhong(userMaSV);
       setmaphongbytksinhvien(maphongsinhvien);
     } catch (err) {
       toast.error(err);
     } finally {
       setLoading(false);
     }
   };
   fetchUser();
   }, [token, userId]);
   const [showDangKySuaChua, setShowDangKySuaChua] = useState(false);
   const [noiDungSuaChua, setNoiDungSuaChua] = useState("");
   const handleOpenDangKySuaChua = () => setShowDangKySuaChua(true);
   const handleCloseDangKySuaChua = () => setShowDangKySuaChua(false);
   const handleDangKySuaChua = async () => {
     if (!noiDungSuaChua.trim()) {
       toast.show('Vui lòng nhập nội dung sửa chữa!', { type: 'danger' });
       return;
     }
     const newBT = {
     MaPhong: maphongbytksinhvien.MaPhong,
     NoiDung: noiDungSuaChua,
     TrangThai: "Chờ xử lý",
     ThoiGian: new Date().toISOString().slice(0, 10),
     };
     try {
       await createBaoTri(newBT);
       toast.show('Đã gửi yêu cầu bảo trì!', { type: 'success' });
       setNoiDungSuaChua("");
       setShowDangKySuaChua(false);
       const capNhat = await getAllBaoTriPhong(sinhvienuser.TenPhong, sinhvienuser.TenTN);
       setbaotriphong(capNhat);
     } catch (err) {
       toast.show('Lỗi khi gửi yêu cầu bảo trì!', { type: 'danger' });
     }
   };
   const [showDangKyGopY, setShowDangKyGopY] = useState(false);
   const [noiDungGopY, setNoiDungGopY] = useState("");
   const handleOpenDangKyGopY = () => setShowDangKyGopY (true);
   const handleCloseDangKyGopY  = () => setShowDangKyGopY (false);
   const handleDangKyGopY  = async () => {
     if (!noiDungGopY.trim()) {
       toast.show('Vui lòng nhập nội dung góp ý!', { type: 'danger' });
       return;
     }
     const newBT = {
     MaSV:userMaSV,
     NoiDung: noiDungGopY,
     Tgian: new Date().toISOString().slice(0, 10),
     };
     try {
       await createGopY(newBT);
       toast.show('Gửi góp ý thành công!', { type: 'success' });
       setNoiDungGopY("");
       setShowDangKyGopY(false);
       const capNhat = await getAllGopYSinhVien(userMaSV);
       setgopy(capNhat);
     } catch (err) {
       toast.show('Lỗi khi gửi góp ý!', { type: 'danger' });
     }
   };
   const [editData, setEditData] = useState(null);
   const [newContent, setNewContent] = useState(""); 
   const handleEditClick = (item) => {
   setEditData(item);
   setNewContent(item.NoiDung);
   };
   const handleEditSubmit = async () => {
   if (!editData) return;
 
   const updated = {
     ...editData,
     NoiDung: newContent,
   };
 
   try {
     await editGopY(editData.IDGopY,updated);
     const gopysinhvien = await getAllGopYSinhVien(userMaSV);
     setgopy(gopysinhvien);
     setEditData(null); 
    toast.show('Đã sửa góp ý!', { type: 'success' });
   } catch (error) {
     toast.show('Lỗi khi sửa góp ý:', { type: 'danger' });
   }
   };
   const [showDangKyTham, setShowDangKyTham] = useState(false);
   const [noiDungDangKyTham, setNoiDungDangKyTham] = useState({
     TgianBatDau:"",
     TgianKetThuc:"",
     MaNT:"",
     TrangThai:"Chờ duyệt",
   });
   const handleOpenDangKyTham = () => setShowDangKyTham(true);
   const handleCloseDangKyTham  = () => setShowDangKyTham(false);
   const handleDangKyTham = async () => {
     const { TgianBatDau, TgianKetThuc, MaNT } = noiDungDangKyTham;
     if (!TgianBatDau || !TgianKetThuc || !MaNT) {
       toast.show('Vui lòng nhập đầy đủ thông tin bắt buộc!', { type: 'danger' });
       return;
     }
 
     const newTham = {
       ...noiDungDangKyTham,
       MaSV: userMaSV
     };
 
   try {
     await createDangKyTham(newTham);
     toast.show('Đăng ký thăm thành công!', { type: 'success' });
     setNoiDungDangKyTham({ MaNT: "", TgianBatDau: "", TgianKetThuc: "", TrangThai: "Chờ duyệt" });
     setShowDangKyTham(false);
     const dangkythamnguoithan = await getByIdDangKyThamSinhVien(userMaSV);
       setdangkytham(dangkythamnguoithan);
   } catch (err) {
     toast.show('Lỗi khi gửi đăng ký:', { type: 'danger' });
   }
   };


  return (
    <ScrollView style={styles.container}>
      {/* Thông tin cá nhân */}
      <View style={styles.card}>
    <Image  source={{ uri: `http://172.20.10.3:3000/uploads/${sinhvienuser?.anh || "default.png"}` }}  style={styles.avatar}/>
    <Text style={styles.status}>{sinhvienuser?.TrangThai || "Không rõ trạng thái"}</Text>
    <View style={styles.info}>
      <Text style={styles.name}>{sinhvienuser?.HoTen || "Chưa có tên"}</Text>
      <Text>📞 {sinhvienuser?.SDT || "Chưa có số điện thoại"}</Text>
      <Text>📧 {sinhvienuser?.Email || "Chưa có email"}</Text>
      <Text>🎂 {sinhvienuser?.NgaySinh ? new Date(sinhvienuser.NgaySinh).toLocaleDateString("vi-VN") : "Chưa có ngày sinh"}</Text>
      <Text>📍 {sinhvienuser?.QueQuan || "Chưa có quê quán"}</Text>
      <Text>👤 {sinhvienuser?.GioiTinh || "Chưa có giới tính"}</Text>
      <Text>🏫 {sinhvienuser?.Truong || "Chưa có trường"}</Text>
      <Text>🚪 {sinhvienuser?.Lop || "Chưa có lớp"}</Text>
      <Text>🕰️ {sinhvienuser?.NienKhoa || "Chưa có niên khóa"}</Text>
    </View>
    <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
      <Text style={styles.logoutText}>Đăng xuất</Text>
    </TouchableOpacity>
      </View>
      {/* Danh sách thành viên cùng phòng */}
      <View style={styles.card}>
        <Text style={styles.heading}>✏️ Danh sách thành viên cùng phòng</Text>
        <Text style={styles.subText}>  Phòng: {sinhvienuser?.TenPhong || "?"} - Tòa Nhà: {sinhvienuser?.TenTN || "?"}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <View style={[styles.tableCell, { width: 50 }]}><Text style={styles.tableHeaderText}>#</Text></View>
          <View style={[styles.tableCell, { width: 150 }]}><Text style={styles.tableHeaderText}>Họ tên</Text></View>
          <View style={[styles.tableCell, { width: 120 }]}><Text style={styles.tableHeaderText}>Ngày Sinh</Text></View>
          <View style={[styles.tableCell, { width: 150 }]}><Text style={styles.tableHeaderText}>Trường</Text></View>
          <View style={[styles.tableCell, { width: 120 }]}><Text style={styles.tableHeaderText}>Ngày bắt đầu</Text></View>
          <View style={[styles.tableCell, { width: 120 }]}><Text style={styles.tableHeaderText}>Ngày kết thúc</Text></View>
          <View style={[styles.tableCell, { width: 100, borderRightWidth: 0 }]}><Text style={styles.tableHeaderText}>Trạng thái</Text></View>
        </View>

        {tenphongtenTNuser.map((item, index) => (
          <View key={index} style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff" }]}>
            <View style={[styles.tableCell, { width: 50 }]}><Text>{index + 1}</Text></View>
            <View style={[styles.tableCell, { width: 150 }]}><Text>{item?.HoTen || "Chưa có tên"}</Text></View>
            <View style={[styles.tableCell, { width: 120 }]}><Text>{item?.NgaySinh ? new Date(item.NgaySinh).toLocaleDateString("vi-VN") : "Chưa có"}</Text></View>
            <View style={[styles.tableCell, { width: 150 }]}><Text>{item?.Truong || "Chưa có trường"}</Text></View>
            <View style={[styles.tableCell, { width: 120 }]}><Text>{item?.NgayBatDau ? new Date(item.NgayBatDau).toLocaleDateString("vi-VN") : "Chưa có"}</Text></View>
            <View style={[styles.tableCell, { width: 120 }]}><Text>{item?.NgayKetThuc ? new Date(item.NgayKetThuc).toLocaleDateString("vi-VN") : "Chưa có"}</Text></View>
            <View style={[styles.tableCell, { width: 100, borderRightWidth: 0 }]}>
              <Text style={{ color: item?.trangthaihopdong === "Đã nhận phòng" ? "#4CAF50" : "#FF9800" }}>
                {item?.trangthaihopdong || "Không rõ"}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
      </View>
      {/* Lịch sử sửa chữa phòng */}
      <View style={styles.card}>
    <Text style={styles.heading}>✏️ Lịch sử sửa chữa phòng</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <View style={[styles.tableCell, { width: 50 }]}><Text style={styles.tableHeaderText}>#</Text></View>
          <View style={[styles.tableCell, { width: 150 }]}><Text style={styles.tableHeaderText}>Nội Dung</Text></View>
          <View style={[styles.tableCell, { width: 120 }]}><Text style={styles.tableHeaderText}>Thời gian thông báo</Text></View>
          <View style={[styles.tableCell, { width: 150 }]}><Text style={styles.tableHeaderText}>Thời gian bảo trì</Text></View>
          <View style={[styles.tableCell, { width: 100, borderRightWidth: 0 }]}><Text style={styles.tableHeaderText}>Trạng thái</Text></View>
        </View>

        {baotriphong.map((item, index) => (
          <View key={index} style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff" }]}>
            <View style={[styles.tableCell, { width: 50 }]}><Text>{index + 1}</Text></View>
            <View style={[styles.tableCell, { width: 150 }]}><Text>{item?.NoiDung || "Không rõ"}</Text></View>
            <View style={[styles.tableCell, { width: 120 }]}><Text>{item?.ThoiGian ? new Date(item.ThoiGian).toLocaleDateString("vi-VN") : "Chưa có"}</Text></View>
            <View style={[styles.tableCell, { width: 150 }]}><Text>{item?.TgianBaoTri ? new Date(item.TgianBaoTri).toLocaleDateString("vi-VN") : "Chưa có"}</Text></View>
            <View style={[styles.tableCell, { width: 100, borderRightWidth: 0 }]}>
              <Text style={{ color: item?.TrangThai === "Đã xử lý" ? "#4CAF50" : "#FF9800" }}>
                {item?.TrangThai || "Không rõ"}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
    <TouchableOpacity style={styles.registerButton} onPress={handleOpenDangKySuaChua}>
        <Text style={styles.registerButtonText}>➕ Đăng ký sửa chữa</Text>
    </TouchableOpacity>
    <Modal visible={showDangKySuaChua} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>🛠️ Đăng ký sửa chữa</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập nội dung sửa chữa"
              value={noiDungSuaChua}
              onChangeText={setNoiDungSuaChua}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.sendButton} onPress={handleDangKySuaChua}>
                <Text style={styles.buttonText}>Gửi</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCloseDangKySuaChua}>
                <Text style={styles.buttonText}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      </View>
      {/* Thông Tin Hóa Đơn */}
      <View style={styles.card}>
    <Text style={styles.heading}>✏️ Thông Tin Hóa Đơn</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <View style={[styles.tableCell, { width: 50 }]}><Text style={styles.tableHeaderText}>#</Text></View>
          <View style={[styles.tableCell, { width: 150 }]}><Text style={styles.tableHeaderText}>Nội Dung</Text></View>
          <View style={[styles.tableCell, { width: 120 }]}><Text style={styles.tableHeaderText}>Thời gian thông báo</Text></View>
          <View style={[styles.tableCell, { width: 150 }]}><Text style={styles.tableHeaderText}>Thời gian bảo trì</Text></View>
          <View style={[styles.tableCell, { width: 150 }]}><Text style={styles.tableHeaderText}>Trạng thái</Text></View>
          <View style={[styles.tableCell, { width: 120, borderRightWidth: 0 }]}><Text style={styles.tableHeaderText}>Chức năng</Text></View>
        </View>
        {baotriphong.map((item, index) => (
          <View key={index} style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff" }]}>
            <View style={[styles.tableCell, { width: 50 }]}><Text>{index + 1}</Text></View>
            <View style={[styles.tableCell, { width: 150 }]}><Text>{item?.NoiDung || "Không rõ"}</Text></View>
            <View style={[styles.tableCell, { width: 120 }]}><Text>{item?.ThoiGian ? new Date(item.ThoiGian).toLocaleDateString("vi-VN") : "Chưa có"}</Text></View>
            <View style={[styles.tableCell, { width: 150 }]}><Text>{item?.TgianBaoTri ? new Date(item.TgianBaoTri).toLocaleDateString("vi-VN") : "Chưa có"}</Text></View>
            <View style={[styles.tableCell, { width: 150 }]}><Text style={{ color: item?.TrangThai === "Đã xử lý" ? "#4CAF50" : "#FF9800" }}>  {item?.TrangThai || "Không rõ"}  </Text></View>
            <View style={[styles.tableCell, { width: 120, borderRightWidth: 0 }]}><TouchableOpacity  style={styles.payButton}><Text style={styles.payButtonText}>Thanh Toán</Text></TouchableOpacity></View>
          </View>
        ))}
      </View>
    </ScrollView>
      </View>
      {/* Thông Tin Hợp Đồng */}
      <View style={styles.card}>
    <Text style={styles.heading}>✏️ Thông Tin Hợp Đồng</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <View style={[styles.tableCell, { width: 100 }]}><Text style={styles.tableHeaderText}>Đơn Xin</Text></View>
          <TouchableOpacity  style={styles.button_img}  onPress={() => handleOpenImage(`http://172.20.10.3:3000/uploads/${hoso.DonXin}`)} ><Text style={styles.text_img}>{hoso.DonXin}</Text></TouchableOpacity>
        </View>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <View style={[styles.tableCell, { width: 100 }]}><Text style={styles.tableHeaderText}>Giấy xác nhận sinh viên</Text></View>
          <TouchableOpacity  style={styles.button_img}  onPress={() => handleOpenImage(`http://172.20.10.3:3000/uploads/${hoso.GiayXacNhanSinhVien}`)} ><Text style={styles.text_img}>{hoso.GiayXacNhanSinhVien}</Text></TouchableOpacity>
        </View>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <View style={[styles.tableCell, { width: 100 }]}><Text style={styles.tableHeaderText}>CCCD Photo</Text></View>
          <TouchableOpacity  style={styles.button_img}  onPress={() => handleOpenImage(`http://172.20.10.3:3000/uploads/${hoso.CCCDPhoTo}`)} ><Text style={styles.text_img}>{hoso.CCCDPhoTo}</Text></TouchableOpacity>
        </View>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <View style={[styles.tableCell, { width: 100 }]}><Text style={styles.tableHeaderText}>Hợp Đồng</Text></View>
          <TouchableOpacity  style={styles.button_img}  onPress={() => handleOpenImage(`http://172.20.10.3:3000/uploads/${hoso.HopDong}`)} ><Text style={styles.text_img}>{hoso.HopDong}</Text></TouchableOpacity>
        </View>
      </View>
      <Modal visible={!!openImage} transparent animationType="slide" onRequestClose={handleCloseImage}>
  <View style={styles.modalContainer}>
    <TouchableOpacity style={styles.modalOverlay} onPress={handleCloseImage} />
    <View style={styles.modalContent}>
      {openImage && (
        <Image source={{ uri: openImage }} style={{ width: 270, height: 370, resizeMode: 'contain' }} />
      )}
    </View>
    <TouchableOpacity  onPress={handleCloseImage}>
      <Text style={styles.buttonText}> ❌Đóng</Text>
    </TouchableOpacity>
  </View>

</Modal>
    </ScrollView>
    <View style={styles.buttonRow}>
  <TouchableOpacity style={styles.registerButton} onPress={handleOpenDangKySuaChua}>
    <Text style={styles.registerButtonText}>Thanh Lý</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.registerButton} onPress={() => handleThanhToan(200000)}>
    <Text style={styles.registerButtonText}>Gia Hạn</Text>
  </TouchableOpacity>
</View>

      </View>
      {/* Thông Tin Dịch Vụ */}
      <View style={styles.card}>
    <Text style={styles.heading}>✏️ Thông Tin Dịch Vụ</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <View style={[styles.tableCell, { width: 50 }]}><Text style={styles.tableHeaderText}>#</Text></View>
          <View style={[styles.tableCell, { width: 150 }]}><Text style={styles.tableHeaderText}>Nội Dung</Text></View>
          <View style={[styles.tableCell, { width: 120 }]}><Text style={styles.tableHeaderText}>Thời gian thông báo</Text></View>
          <View style={[styles.tableCell, { width: 150 }]}><Text style={styles.tableHeaderText}>Thời gian bảo trì</Text></View>
          <View style={[styles.tableCell, { width: 150 }]}><Text style={styles.tableHeaderText}>Trạng thái</Text></View>
          <View style={[styles.tableCell, { width: 120, borderRightWidth: 0 }]}><Text style={styles.tableHeaderText}>Chức năng</Text></View>
        </View>
        {baotriphong.map((item, index) => (
          <View key={index} style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff" }]}>
            <View style={[styles.tableCell, { width: 50 }]}><Text>{index + 1}</Text></View>
            <View style={[styles.tableCell, { width: 150 }]}><Text>{item?.NoiDung || "Không rõ"}</Text></View>
            <View style={[styles.tableCell, { width: 120 }]}><Text>{item?.ThoiGian ? new Date(item.ThoiGian).toLocaleDateString("vi-VN") : "Chưa có"}</Text></View>
            <View style={[styles.tableCell, { width: 150 }]}><Text>{item?.TgianBaoTri ? new Date(item.TgianBaoTri).toLocaleDateString("vi-VN") : "Chưa có"}</Text></View>
            <View style={[styles.tableCell, { width: 150 }]}><Text style={{ color: item?.TrangThai === "Đã xử lý" ? "#4CAF50" : "#FF9800" }}>  {item?.TrangThai || "Không rõ"}  </Text></View>
            <View style={[styles.tableCell, { width: 120, borderRightWidth: 0 }]}><TouchableOpacity  style={styles.payButton}><Text style={styles.payButtonText}>Thanh Toán</Text></TouchableOpacity></View>
          </View>
        ))}
      </View>
    </ScrollView>
      </View>
      {/* Góp ý - phản hồi */}
      <View style={styles.card}>
    <Text style={styles.heading}>✏️ Góp ý - Phản hồi</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <View style={[styles.tableCell, { width: 50 }]}><Text style={styles.tableHeaderText}>#</Text></View>
          <View style={[styles.tableCell, { width: 150 }]}><Text style={styles.tableHeaderText}>Nội Dung</Text></View>
          <View style={[styles.tableCell, { width: 120 }]}><Text style={styles.tableHeaderText}>Thời gian</Text></View>
          <View style={[styles.tableCell, { width: 100, borderRightWidth: 0 }]}><Text style={styles.tableHeaderText}>Chức năng</Text></View>
        </View>
        {gopy.map((item, index) => (
          <View key={index} style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff" }]}>
            <View style={[styles.tableCell, { width: 50 }]}><Text>{index + 1}</Text></View>
            <View style={[styles.tableCell, { width: 150 }]}><Text>{item?.NoiDung || "Không rõ"}</Text></View>
            <View style={[styles.tableCell, { width: 120 }]}><Text>{item?.Tgian ? new Date(item.Tgian).toLocaleDateString("vi-VN") : "Chưa có"}</Text></View>
            <View style={[styles.tableCell, { width: 100, borderRightWidth: 0 }]}><TouchableOpacity onPress={() => handleEditClick(item)}  style={styles.payButton}><Text style={styles.payButtonText}>Sửa</Text></TouchableOpacity></View>
          </View>
        ))} 
      </View>
    </ScrollView>
    <TouchableOpacity style={styles.registerButton} onPress={handleOpenDangKyGopY}>
        <Text style={styles.registerButtonText}>➕ Thêm góp ý - phản hồi</Text>
    </TouchableOpacity>
    <Modal visible={showDangKyGopY} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Đăng ký Góp Ý</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập nội dung góp ý... "
              value={noiDungGopY}
              onChangeText={setNoiDungGopY}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.sendButton} onPress={handleDangKyGopY}>
                <Text style={styles.buttonText}>Gửi</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCloseDangKyGopY}>
                <Text style={styles.buttonText}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    </Modal>
    <Modal visible={!!editData} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sửa góp ý</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập nội dung góp ý... "
              value={newContent}
              onChangeText={setNewContent}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.sendButton} onPress={handleEditSubmit}>
                <Text style={styles.buttonText}>Gửi</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setEditData(null)}>
                <Text style={styles.buttonText}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    </Modal>
      </View>
      {/* Danh sách người thân */}
      <View style={styles.card}>
        <Text style={styles.heading}>✏️ Danh sách người thân</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <View style={[styles.tableCell, { width: 50 }]}><Text style={styles.tableHeaderText}>#</Text></View>
          <View style={[styles.tableCell, { width: 150 }]}><Text style={styles.tableHeaderText}>Họ tên</Text></View>
          <View style={[styles.tableCell, { width: 120 }]}><Text style={styles.tableHeaderText}>SDT</Text></View>
          <View style={[styles.tableCell, { width: 150 }]}><Text style={styles.tableHeaderText}>Địa Chỉ</Text></View>
          <View style={[styles.tableCell, { width: 120 }]}><Text style={styles.tableHeaderText}>Quan Hệ</Text></View>
        </View>
        {nguoithan.map((item, index) => (
          <View key={index} style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff" }]}>
            <View style={[styles.tableCell, { width: 50 }]}><Text>{index + 1}</Text></View>
            <View style={[styles.tableCell, { width: 150 }]}><Text>{item?.HoTen || "Chưa có tên"}</Text></View>
            <View style={[styles.tableCell, { width: 120 }]}><Text>{item?.SDT || "Chưa có"}</Text></View>
            <View style={[styles.tableCell, { width: 150 }]}><Text>{item?.DiaChi || "Chưa có địa chỉ"}</Text></View>
            <View style={[styles.tableCell, { width: 120 }]}><Text>{item?.QuanHe || "Chưa có"}</Text></View>
          </View>
        ))}
      </View>
    </ScrollView>
      </View>
      {/* Lịch sử thăm */}
      <View style={styles.card}>
    <Text style={styles.heading}>✏️ Lịch sử thăm</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <View style={[styles.tableCell, { width: 50 }]}><Text style={styles.tableHeaderText}>#</Text></View>
          <View style={[styles.tableCell, { width: 150 }]}><Text style={styles.tableHeaderText}>Họ Tên</Text></View>
          <View style={[styles.tableCell, { width: 120 }]}><Text style={styles.tableHeaderText}>Quan Hệ</Text></View>
          <View style={[styles.tableCell, { width: 120 }]}><Text style={styles.tableHeaderText}>Thời gian bắt đầu</Text></View>
          <View style={[styles.tableCell, { width: 120 }]}><Text style={styles.tableHeaderText}>Thời gian kết thúc</Text></View>
          <View style={[styles.tableCell, { width: 100, borderRightWidth: 0 }]}><Text style={styles.tableHeaderText}>Trạng Thái</Text></View>
        </View>
        {dangkytham.map((item, index) => (
          <View key={index} style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff" }]}>
            <View style={[styles.tableCell, { width: 50 }]}><Text>{index + 1}</Text></View>
            <View style={[styles.tableCell, { width: 150 }]}><Text>{item?.HoTen || "Không rõ"}</Text></View>
            <View style={[styles.tableCell, { width: 120 }]}><Text>{item?.QuanHe || "Không rõ"}</Text></View>
            <View style={[styles.tableCell, { width: 120 }]}><Text>{item?.TgianBatDau ? new Date(item.TgianBatDau).toLocaleDateString("vi-VN") : "Chưa có"}</Text></View>
            <View style={[styles.tableCell, { width: 120 }]}><Text>{item?.TgianKetThuc ? new Date(item.TgianKetThuc).toLocaleDateString("vi-VN") : "Chưa có"}</Text></View>
            <View style={[styles.tableCell, { width: 100 }]}><Text>{item?.TrangThai || "Không rõ"}</Text></View>
          </View>
        ))} 
      </View>   
    </ScrollView>
    <TouchableOpacity style={styles.registerButton} onPress={handleOpenDangKyTham}> 
        <Text style={styles.registerButtonText}>➕Đăng ký vào thăm</Text>
    </TouchableOpacity>
    <Modal visible={showDangKyTham} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Đăng ký vào thăm</Text>
            <Text>Người thân:</Text>
            <Picker selectedValue={noiDungDangKyTham.MaNT}  onValueChange={(value) => setNoiDungDangKyTham({...noiDungDangKyTham,MaNT:value })} style={{ borderWidth: 1 }} >
              <Picker.Item label="-- Chọn người thân --" value="" />
              {nguoithan.map((nt) => (
                <Picker.Item key={nt.id} label={nt.HoTen} value={nt.id} />
              ))}
            </Picker>
            <Text>Thời gian bắt đầu:</Text>
            <TouchableOpacity onPress={() => { setField('TgianBatDau'); setShow(true); }}>
              <TextInput value={noiDungDangKyTham.TgianBatDau} placeholder="Chọn ngày" editable={false} style={{ borderWidth: 1, marginBottom: 8 }}/>
            </TouchableOpacity>
            <Text>Thời gian kết thúc:</Text>
            <TouchableOpacity onPress={() => { setField('TgianKetThuc'); setShow(true); }}>
              <TextInput value={noiDungDangKyTham.TgianKetThuc} placeholder="Chọn ngày" editable={false} style={{ borderWidth: 1, marginBottom: 8 }}/>
            </TouchableOpacity>
            {show && (<DateTimePicker value={new Date()} mode="date"display={Platform.OS === 'ios' ? 'spinner' : 'default'}onChange={onChange}/>)}
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.sendButton} onPress={handleDangKyTham}>
                <Text style={styles.buttonText}>Gửi</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCloseDangKyTham}>
                <Text style={styles.buttonText}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    </Modal> 
      </View>
      {/* Kỷ luật */}
      <View style={styles.card}>
        <Text style={styles.heading}>✏️Kỷ luật</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <View style={[styles.tableCell, { width: 50 }]}><Text style={styles.tableHeaderText}>#</Text></View>
          <View style={[styles.tableCell, { width: 150 }]}><Text style={styles.tableHeaderText}>Nội Dung</Text></View>
          <View style={[styles.tableCell, { width: 120 }]}><Text style={styles.tableHeaderText}>Ngày Vi Phạm</Text></View>
          <View style={[styles.tableCell, { width: 150 }]}><Text style={styles.tableHeaderText}>Hình Thức Xử Lý</Text></View>
        </View>
        {kyluat.map((item, index) => (
          <View key={index} style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff" }]}>
            <View style={[styles.tableCell, { width: 50 }]}><Text>{index + 1}</Text></View>
            <View style={[styles.tableCell, { width: 150 }]}><Text>{item?.NoiDungViPham || "Chưa có tên"}</Text></View>
            <View style={[styles.tableCell, { width: 120 }]}><Text>{item?.NgayViPham ? new Date(item.NgayViPham).toLocaleDateString("vi-VN") : "Chưa có"}</Text></View>
            <View style={[styles.tableCell, { width: 150 }]}><Text>{item?.HinhThucXuLy || "Chưa có địa chỉ"}</Text></View>
          </View>
        ))}
      </View>
    </ScrollView>
      </View>
      {/* Lịch sử ra vào */}
      <View style={styles.card}>
        <Text style={styles.heading}>✏️Lịch sử ra vào</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <View style={[styles.tableCell, { width: 50 }]}><Text style={styles.tableHeaderText}>#</Text></View>
          <View style={[styles.tableCell, { width: 150 }]}><Text style={styles.tableHeaderText}>Loại Hoạt Động</Text></View>
          <View style={[styles.tableCell, { width: 120 }]}><Text style={styles.tableHeaderText}>Tgian</Text></View>
          <View style={[styles.tableCell, { width: 150 }]}><Text style={styles.tableHeaderText}>Trạng Thái</Text></View>
        </View>
        {lichsuravao.map((item, index) => (
          <View key={index} style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff" }]}>
            <View style={[styles.tableCell, { width: 50 }]}><Text>{index + 1}</Text></View>
            <View style={[styles.tableCell, { width: 150 }]}><Text>{item?.LoaiHoatDong || "Chưa có tên"}</Text></View>
            <View style={[styles.tableCell, { width: 120 }]}><Text>{item?.Tgian ? new Date(item.Tgian).toLocaleDateString("vi-VN") : "Chưa có"}</Text></View>
            <View style={[styles.tableCell, { width: 150 }]}><Text>{item?.TrangThai || "Chưa có địa chỉ"}</Text></View>
          </View>
        ))}
      </View>
    </ScrollView>
      </View>    
</ScrollView> 

  ); 
} 
const styles = StyleSheet.create({
  buttonRow: {  flexDirection: 'row',justifyContent: 'space-between',marginTop: 10,
  },
  container: {  backgroundColor: '#f9f9f9',padding: 16, flex: 1,paddingBottom: 40, 
 },
  card: {  backgroundColor: '#fff',  borderRadius: 12,  padding: 16,   marginBottom: 16,  shadowColor: '#000',  shadowOpacity: 0.05,  shadowRadius: 6,  shadowOffset: { width: 0, height: 3 },  elevation: 3,
  },
  avatar: { width: 120,height: 120,borderRadius: 60,alignSelf: 'center',marginBottom: 12,
  },
  name: {fontSize: 22,fontWeight: 'bold',textAlign: 'center',color: '#333',
  },
  status: { textAlign: 'center',color: '#4CAF50',marginBottom: 8,fontWeight: '600',
  },
  info: { marginTop: 12,gap: 4,
  },
  heading: { fontSize: 20,fontWeight: 'bold',marginBottom: 8,color: '#222',
  },
  subText: {fontSize: 16,color: '#555',marginBottom: 12,
  },
  logoutButton: { backgroundColor: '#FF4D4D', paddingVertical: 12, borderRadius: 8, marginTop: 24, marginBottom: 12,
  },
  logoutText: {color: '#fff',textAlign: 'center',fontWeight: 'bold',fontSize: 16,
  },
  button: {backgroundColor: '#1976D2',paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, alignItems: 'center',  marginTop: 8,
  },
  buttonText: {color: '#fff',fontWeight: '600',fontSize: 16,
  },
  modalBackground: {flex: 1,backgroundColor: 'rgba(0,0,0,0.5)',justifyContent: 'center',alignItems: 'center',
  },
  modalContainer: {backgroundColor: '#fff',borderRadius: 12,padding: 20,width: '90%',
  },
  textArea: {height: 120,borderColor: '#ccc',borderWidth: 1,borderRadius: 8,padding: 10,textAlignVertical: 'top',marginBottom: 12,
  },
  modalButtons: {flexDirection: 'row',justifyContent: 'space-between',
  },
  modalButton: {backgroundColor: '#1976D2',paddingVertical: 10,paddingHorizontal: 20,borderRadius: 8,flex: 1,marginHorizontal: 4,alignItems: 'center',
  },
  sectionTitle: {fontSize: 18,fontWeight: 'bold',color: '#444',marginBottom: 6,
  },
  listItem: {flexDirection: 'row',justifyContent: 'space-between',paddingVertical: 8,borderBottomWidth: 1,  borderBottomColor: '#eee',
  },
  done: {color: '#4CAF50',fontWeight: 'bold',
  },
  waiting: {color: '#FF9800',fontWeight: 'bold',
  },
  registerBtn: {backgroundColor: '#1976D2', paddingVertical: 10,borderRadius: 8,marginTop: 10,
  },
  registerText: {color: '#fff',textAlign: 'center',fontWeight: 'bold',
  },
  table: { borderWidth: 1,borderColor: '#ccc',borderRadius: 6,overflow: 'hidden',
  },
  tableRow: {flexDirection: 'row',
  },
  tableHeader:{backgroundColor: '#666',
  },
  tableCell: {padding: 8,borderRightWidth: 1,borderRightColor: '#ccc',justifyContent: 'center',
  },
  tableHeaderText: {color: '#fff',fontWeight: 'bold',fontSize: 13,
  },
  registerButton: {marginTop: 10,alignSelf: 'flex-start',backgroundColor: '#007BFF',paddingVertical: 8,paddingHorizontal: 12,borderRadius: 8,
},
registerButtonText: { color: '#fff',fontWeight: 'bold',
},
modalContainer: { flex: 1, justifyContent: 'center',alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)',
},
modalContent: {backgroundColor: '#fff',width: '80%',borderRadius: 10,padding: 20,
},
modalTitle: {fontSize: 18,fontWeight: 'bold', marginBottom: 10,
},
input: {borderWidth: 1,borderColor: '#ccc',borderRadius: 8,padding: 10, marginBottom: 15,
},
modalButtonContainer: {flexDirection: 'row', justifyContent: 'space-between',
},
sendButton: {backgroundColor: '#4CAF50',paddingVertical: 8,paddingHorizontal: 16,borderRadius: 8,
},
cancelButton: {backgroundColor: '#FF5722',paddingVertical: 8,paddingHorizontal: 16,borderRadius: 8,
},
buttonText: {color: '#fff', fontWeight: 'bold',
},
payButton: {backgroundColor: '#007BFF',paddingVertical: 6,paddingHorizontal: 12,borderRadius: 6,alignItems: 'center',
},
payButtonText: {color: '#fff',fontSize: 12,fontWeight: 'bold',
},
button_img: {  padding: 8, backgroundColor: '#e0e0e0', borderRadius: 6, marginVertical: 5,
},
text_img: { color: '#007bff',textDecorationLine: 'underline',
},
});
