const { MONGO_URL } = require('../utils/constants');

const mongoose = require('mongoose').set('debug', true);

class MongoDatabase {
  constructor() {
    this.mongoose = mongoose;
    this.uri = MONGO_URL;
  }


  async connect() {
    try {
      await this.mongoose.connect(this.uri)
      console.log('Mongo is connected')
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async disconnect() {
    try {
      await mongoose.disconnect();
      console.log('Mongo is disconnected')
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = new MongoDatabase();
