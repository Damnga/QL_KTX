
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.5:3000';

export const register = async (formData) => {
  try {
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    const response = await axios.post(`${API_URL}/register`, formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Lỗi đăng ký người dùng' };
  }
};

export const login = async (Email, Password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { Email, Password });
    const token = response.data.token;

    if (!token) {
      throw { message: 'Không nhận được token từ server' };
    }

    await AsyncStorage.setItem('token', token);
    return response.data;
  } catch (error) {
    console.log('ERROR LOGIN:', error.response?.data || error);
    throw error.response?.data || { message: 'Lỗi đăng nhập' };
  }
};
export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`);
    localStorage.removeItem('token');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Lỗi đăng xuất' };
  }
};

export const getAll = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Lỗi lấy danh sách người dùng' };
  }
};

export const getById = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Lỗi lấy thông tin người dùng' };
  }
};
export const getByEmail = async (Email, token) => {
  try {
    const response = await axios.get(`${API_URL}/${Email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Lỗi lấy thông tin người dùng' };
  }
};

export const update = async (id, formData, token) => {
  try {
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    const response = await axios.put(`${API_URL}/${id}`, formDataToSend, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Lỗi cập nhật người dùng' };
  }
};
export const updateMaQP = async (IDTaiKhoan, formData, token) => {
  try {
    const response = await axios.put(`${API_URL}/data/${IDTaiKhoan}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Lỗi cập nhật người dùng' };
  }
};
export const deleteUser = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Lỗi xóa người dùng' };
  }
};
export const resetPassword = async (Email) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, { Email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Lỗi kết nối đến máy chủ" };
  }
};
