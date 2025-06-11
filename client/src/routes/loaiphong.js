
import axios from 'axios';

const API_URL = 'http://localhost:3000/loai_phong';

export const createLoaiPhong = async (formData) => {
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
export const getAllLoaiPhong = async (token) => {
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

export const getByIdLoaiPhong = async (MaLoai, token) => {
  try {
    const response = await axios.get(`${API_URL}/${MaLoai}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

// export const edit = async (MaLoai, formData, token) => {
//   try {
//     const formDataToSend = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       formDataToSend.append(key, value);
//     });

//     const response = await axios.put(`${API_URL}/${MaLoai}`, formDataToSend, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     return response.data;
//   } catch (error) {
//     throw error.response?.data;
//   }
// };
export const editLoaiPhong = async (MaLoai, formData, token) => {
  try {
    const response = await axios.put(`${API_URL}/${MaLoai}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const removeLoaiPhong = async (MaLoai, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${MaLoai}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};
