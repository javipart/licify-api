const mongoose = require('mongoose');

const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  initialDate: {
    type: Date,
    required: true,
  },
  finalDate: {
    type: Date,
    required: true,
  },
  items: {
    type: Schema.Types.Mixed,
    required: true
  },
  propousals: [{
    type: ObjectId,
    ref: 'propousal'
  }],
  builder: {
    type: ObjectId,
    required: true,
    index: true,
    ref: 'user'
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
    index: true,
  },
  provider: {
    type: ObjectId,
    default: null,
    ref: 'user',
    index: true
  }
}, { strictPopulate: false });

module.exports = mongoose.model('project', schema);
