
import axios from 'axios';

const API_URL = 'http://localhost:3000/phong';

export const createPhong = async (formData, token) => {
  try {
    const response = await axios.post(`${API_URL}/create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const getAllPhong = async (token) => {
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
export const getAllPhongTong = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/select_tong`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};
export const getAllPhongTongGiuong = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/select_data_giuong`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};
export const getAllPhongData = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/select_data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const getByIdPhong = async (MaPhong) => {
  try {
    const response = await axios.get(`${API_URL}/${MaPhong}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const getByIdTenPhong = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL}/ten_phong/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};
export const getByIdTenPhongTenTN = async (TenPhong,TenTN,token) => {
  try {
    const response = await axios.get(`${API_URL}/tenphong/${TenPhong}/toanha/${TenTN}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const editPhong = async (MaPhong, formData, token) => {
  try {
    const response = await axios.put(`${API_URL}/${MaPhong}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const removePhong = async (MaPhong, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${MaPhong}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};
