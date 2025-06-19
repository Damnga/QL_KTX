
import axios from 'axios';

const API_URL = 'http://localhost:3000/chi_tiet_hoa_don';


export const createChiTietHoaDon = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/create`, data);
    return { success: true, data: response.data };
  } catch (error) {
    const errMessage =
      error.response?.data?.message ||
      error.message ||
      'Lỗi tạo chi tiết hóa đơn';

    return { success: false, error: errMessage };
  }
};

export const getAllChiTietHoaDon = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/select`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const getAllChiTietHoaDonData = async (MaHD,token) => {
  try {
    const response = await axios.get(`${API_URL}/select/${MaHD}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const getByIdChiTietHoaDon = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const editChiTietHoaDon = async (id, formData, token) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const removeChiTietHoaDon = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};
