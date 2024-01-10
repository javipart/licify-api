const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserRepository = require('../repositories/userRepository');
const { API_SECRET, CRYPTO_JS_KEY } = require('../utils/constants');
const CryptoJS = require('crypto-js');
const userRepository = new UserRepository();

module.exports = {
  login: async (req, res, next) => {
    let result = false;
    const { body } = req;
    try {
      const user = await userRepository.getUser(body.username);
      const pass = CryptoJS.AES.decrypt(body.password, CRYPTO_JS_KEY).toString(CryptoJS.enc.Utf8);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      const isPasswordValid = await user.comparePassword(pass);

      if (!isPasswordValid) {
        throw new Error('Contraseña incorrecta');
      }
      const token = jwt.sign({ id: user._id, username: user.username, type: user.type }, API_SECRET, {
        expiresIn: '1h',
      });
      data = { token };
      result = true;
    } catch (error) {
      return next(error);
    }
    return res.response(result, data);
  }
};
