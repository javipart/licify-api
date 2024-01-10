const User = require('../models/user');

class UserRepository {
  async getUser(username) {
    try {
      const user = await User.findOne({ username });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async createUser(data) {
    try {
      const user = await new User(data);
      user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserRepository;
