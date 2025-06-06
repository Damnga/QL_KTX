import axios from 'axios';

const API_URL = 'http://localhost:3000/chatbot';

export const sendQuestionToChatbot = async (question) => {
  const response = await axios.post(`${API_URL}/chat`, { question });
  return response.data.answer;
};