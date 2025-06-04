
import axios from 'axios';

const API_URL = 'http://localhost:3000/toa_nha';


export const create = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};
export const getAll = async (token) => {
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

export const getById = async (MaTN, token) => {
  try {
    const response = await axios.get(`${API_URL}/${MaTN}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const edit = async (MaTN, formData, token) => {
  try {
    const response = await axios.put(`${API_URL}/${MaTN}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const remove = async (MaTN, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${MaTN}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};
