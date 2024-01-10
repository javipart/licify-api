const mongoose = require('mongoose');

const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
  project: {
    type: ObjectId,
    required: true,
    index: true,
    ref: 'project'
  },
  provider: {
    type: ObjectId,
    required: true,
    index: true,
    ref: 'user'
  },
  items: {
    type: Schema.Types.Mixed,
    required: true
  }
}, { strictPopulate: false });

module.exports = mongoose.model('propousal', schema);
