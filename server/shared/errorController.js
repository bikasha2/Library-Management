const errorController = (err, req, res, next) => {
  console.log(err)
  if (err.isOperational) {
    return res.status(err.status).json({
      error: err.message,
      data: null,
    });
  }
  return res.status(500).json({
    error: 'Internal server error',
    data: null,
  });
};

module.exports = errorController;
