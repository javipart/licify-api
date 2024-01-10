const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  document: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['constructor', 'provider']
  }
});

schema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('user', schema);
