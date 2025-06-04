import axios from 'axios';

const API_URL = 'http://localhost:3000/thanh_toan';
export const handleThanhToan = async () => {
  try {
    const response = await axios.post(`${API_URL}/create_payment`, {
      amount: 100000
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    window.location.href = response.data.paymentUrl;
  } catch (error) {
    console.error("Lỗi thanh toán:", error);
  }
};