const ImageRepository = require('../repositories/imageRepository');
const imageRepository = new ImageRepository();

module.exports = {
  get: async (req, res, next) => {
    let result = false;
    let { default: data = '' } = req;
    try {
      
    } catch (err) {
      return next(err);
    }
    return res.response(result, data);
  }
}