const Propousal = require('../models/propousal');

class PropousalRepository {
  async create(data) {
    try {
      const propousal = new Propousal(data);
      propousal.save();
      return propousal;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PropousalRepository;
