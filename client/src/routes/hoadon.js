
import axios from 'axios';

const API_URL = 'http://localhost:3000/hoa_don';


export const createHoaDon = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/create`, data);
    return { success: true, data: response.data };
  } catch (error) {
    const errMessage =
      error.response?.data?.message ||
      error.message ||
      'Lỗi tạo hóa đơn';

    return { success: false, error: errMessage };
  }
};


export const getAllHoaDon = async (token) => {
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

export const getAllHoaDonData = async (id,token) => {
  try {
    const response = await axios.get(`${API_URL}/select_data/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const getByIdHoaDon = async (id, token) => {
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

export const editHoaDon = async (id, data, token) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const removeHoaDon = async (id, token) => {
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
