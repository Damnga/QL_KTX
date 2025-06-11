export const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({
      message: 'Đã xảy ra lỗi phía server',
      error: err.message
    });
  };
  