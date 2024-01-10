const { default: mongoose } = require('mongoose');
const Project = require('../models/project');

const baseAggregate = [
  {
    $lookup: {
      from: 'propousals',
      localField: '_id',
      foreignField: 'project',
      as: 'propousals'
    }
  }, {
    $lookup: {
      from: 'users',
      localField: 'builder',
      foreignField: '_id',
      as: 'builder'
    }
  },
  {
    $lookup: {
      from: 'users',
      localField: 'propousals.provider',
      foreignField: '_id',
      as: 'providers'
    }
  },
  {
    $addFields: {
      builder: { $arrayElemAt: ['$builder', 0] }
    }
  },
]

class ProjectRepository {
  async create(data) {
    try {
      const project = new Project(data);
      await project.save();
      return project;
    } catch (error) {
      throw error;
    }
  }

  async get(id) {
    try {
      const project = await Project.findById(id);
      return project;
    } catch (error) {
      throw error;
    }
  }

  async getAll(id) {
    try {
      const providerId = new mongoose.Types.ObjectId(id);
      const aggregate = JSON.parse(JSON.stringify(baseAggregate));
      aggregate.push({
        $match: {
          $and: [
            {
              $or: [
                { propousals: { $size: 0 } },
                { 'propousals.provider': { $ne: providerId } }
              ]
            },
            { status: true }
          ]
        }
      })
      const projects = await Project.aggregate(aggregate);
      return projects;
    } catch (error) {
      throw error;
    }
  }

  async getByConstructor(id) {
    try {
      const projects = await Project.find({ builder: id })
        .populate({ path: 'propousals', populate: { path: 'provider' } });
      return projects;
    } catch (error) {
      throw error;
    }
  }

  async getByProvider(id) {
    try {
      const projects = await Project.find({ provider: id })
        .populate({ path: 'propousals', populate: { path: 'provider' } });
      return projects;
    } catch (error) {
      throw error;
    }
  }

  async findApplied(id) {
    try {
      const providerId = new mongoose.Types.ObjectId(id);
      const aggregate = JSON.parse(JSON.stringify(baseAggregate));
      aggregate.push({
        $match: {
          $and: [
            { propousals: { $not: { $size: 0 } } },
            { provider: '' },
            { 'propousals.provider': providerId }
          ]
        }
      });
      const projects = await Project.aggregate(aggregate);
      return projects;
    } catch (error) {

    }
  }

  async update(id, data) {
    try {
      const project = await Project.findByIdAndUpdate(id, data, { new: true });
      return project;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProjectRepository;
