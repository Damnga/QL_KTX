import { askOpenAI } from '../service/openai.js';

export const handleChat = async (req, res) => {
  const { message } = req.body;

  try {
    const reply = await askOpenAI(message);
    res.json({ reply });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ message: "Lỗi phản hồi từ AI" });
  }
};
