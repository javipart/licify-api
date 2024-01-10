const project = require('../models/project');
const ProjectRepository = require('../repositories/projectRepository');
const PropousalRepository = require('../repositories/propousalRepository');
const propousalRepository = new PropousalRepository();
const projectRepository = new ProjectRepository();

module.exports = {
  get: async (req, res, next) => {
    let result = false;
    let { default: data = '' } = req;
    try {

    } catch (err) {
      return next(err);
    }
    return res.response(result, data);
  },
  create: async (req, res, next) => {
    let result = false;
    let data = '';
    const { body } = req;
    try {
      const project = await projectRepository.get(body.project);
      if (!project) {
        return new Error('Proyecto no encontrado');
      }
      const propousal = await propousalRepository.create(body)
      project.propousals.push(propousal._id);
      await projectRepository.update(propousal.project, { propousals: project.propousals });
      data = propousal;
      result = true;
    } catch (err) {
      return next(err);
    }
    return res.response(result, data);
  }
}