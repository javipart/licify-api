const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  project: {
    type: String,
    required: true,
    index: true,
    ref: 'project'
  },
  data: {
    type: Date,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
}, { strictPopulate: false });

module.exports = mongoose.model('image', schema);
