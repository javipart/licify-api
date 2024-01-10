const Image = require('../models/image');

class ImageRepository {
  async getImages(project) {
    try {
      const user = await Image.find({ project });
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ImageRepository;
