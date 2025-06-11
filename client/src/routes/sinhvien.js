
import axios from 'axios';

const API_URL = 'http://localhost:3000/sinh_vien';

export const createSinhVien = async (formData, token) => {
  try {
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    const response = await axios.post(`${API_URL}/create`, formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}` 
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
export const createSinhVien2 = async (formData, token) => {
  try {
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    const response = await axios.post(`${API_URL}/createsinhvien`, formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}` 
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getAllSinhVien = async (token) => {
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

export const getAllSinhVienData = async (token) => {
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
export const getByIdTaiKhoanSinhVien  = async (id,token) => {
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

export const getByIdSinhVien = async (id, token) => {
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
export const getByCCCDSinhVien = async (CCCD, token) => {
  try {
    const response = await axios.get(`${API_URL}/select_CCCD/${CCCD}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};
export const getByIdSinhVienUser  = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL}/data/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const editSinhVien = async (id, formData, token) => {
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
    throw error.response?.data;
  }
};

export const removeSinhVien = async (MaPhong, token) => {
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
