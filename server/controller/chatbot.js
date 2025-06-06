import faqData from '../model/chatbot.js';

export const getAnswerFromQuestion = (req, res) => {
  const question = req.body.question?.toLowerCase() || '';

  const match = faqData.find(faq =>
    faq.keywords.some(keyword => question.includes(keyword))
  );

  const answer = match
    ? match.answer
    : "Xin lỗi, tôi chưa có thông tin về câu hỏi này. Vui lòng liên hệ ban quản lý KTX.";

  res.json({ answer });
};