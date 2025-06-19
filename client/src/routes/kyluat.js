
import axios from 'axios';

const API_URL = 'http://localhost:3000/ky_luat';

export const createKyLuat = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/create`, data, {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getAllKyLuat = async (token) => {
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

export const getAllKyLuatData = async (token) => {
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

export const getByIdKyLuat = async (id, token) => {
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
export const getByIdKyLuatSinhVien = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL}/select/sinhvien/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const editKyLuat = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data ;
  }
};

export const removeKyLuat = async (id, token) => {
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
