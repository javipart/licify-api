const lib = {
  create_response: (success, data) => ({
    success,
    data,
  }),

  error_msg: 'Error Processing',

  getHost: req => `${req.protocol}://${req.get('host')}`,

  format_error: err => ({
    message: err.message,
    error: err.toString(),
  }),
};

module.exports = (req, res, next) => {
  req.utils = lib;
  next();
};
