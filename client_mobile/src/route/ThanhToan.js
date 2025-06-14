import axios from 'axios';
import { Linking, Alert } from 'react-native';
const API_URL = 'http://192.168.1.5:3000/thanh_toan';
export const handleThanhToan = async (amount) => {
  try {
    const response = await axios.post(`${API_URL}/create_payment`, {
      amount: amount,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const paymentUrl = response.data.paymentUrl;

    if (paymentUrl) {
      const supported = await Linking.canOpenURL(paymentUrl);
      if (supported) {
        await Linking.openURL(paymentUrl);
      } else {
        Alert.alert('Không thể mở liên kết:', paymentUrl);
      }
    } else {
      Alert.alert('Lỗi', 'Không nhận được đường dẫn thanh toán từ server.');
    }

  } catch (error) {
    console.error('Lỗi thanh toán:', error);
    Alert.alert('Lỗi thanh toán', 'Vui lòng thử lại sau.');
  }
};