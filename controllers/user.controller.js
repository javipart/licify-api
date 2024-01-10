const UserRepository = require('../repositories/userRepository');
const userRepository = new UserRepository();
const bcrypt = require('bcrypt');

module.exports = {
  get: async (req, res, next) => {
    let result = false;
    let data = '';
    try {
      
    } catch (err) {
      return next(err);
    }
    return res.response(result, data);
  },
  save: async (req, res, next) => {
    let result = false;
    let data = '';
    const { body } = req;
    try {
      const hashedPassword = await bcrypt.hash(body.password, 10);
      body.password = hashedPassword
      const user = await userRepository.createUser(body);
      data = user,
      result = true;
    } catch (err) {
      return next(err);
    }
    return res.response(result, data);
  }
}