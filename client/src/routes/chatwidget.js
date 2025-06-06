import axios from 'axios';

const API_URL = 'http://localhost:3000/openai';
export const sendMessageToBot = async (message) => {
  try {
    const res = await axios.post(`${API_URL}/chat`, { message });
    return res.data;
  } catch (err) {
    console.error("Lỗi gọi API chatbot:", err);
    throw new Error(err.response?.data?.message || "Lỗi máy chủ");
  }
};