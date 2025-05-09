import jwt from 'jsonwebtoken';
import { getTaiKhoanById } from '../model/taikhoan.js';

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Thiếu token xác thực' });
  try {
    const decoded = jwt.verify(token, 'secret');
    const user = await getTaiKhoanById(decoded.id);
    if (!user) return res.status(403).json({ message: 'Người dùng không tồn tại' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token không hợp lệ' });
  }
};


export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.MaPQ)) {
      return res.status(403).json({ message: 'Bạn không có quyền truy cập chức năng này' });
    }
    next();
  };
};
