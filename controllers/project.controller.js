const ProjectRepository = require('../repositories/projectRepository');
const projectRepository = new ProjectRepository();

module.exports = {
  get: async (req, res, next) => {
    let result = false;
    let { params } = req;
    const { id } = params;
    try {
      await projectRepository.get(id).then(project => {
        data = project;
        result = true;
      })
    } catch (err) {
      return next(err);
    }
    return res.response(result, data);
  },
  save: async (req, res, next) => {
    let result = false;
    const { body } = req;
    try {
      const { items } = body;
      const newItems = {};
      items.forEach(item => {
        newItems[item.item] = item.value;
      });
      body.items = newItems;
      await projectRepository.create(body).then(project => {
        data = project
        result = true;
      })
    } catch (err) {
      return next(err);
    }
    return res.response(result, data);
  },
  all: async (req, res, next) => {
    let result = false;
    try {
      await projectRepository.getAll().then(projects => {
        data = projects;
        result = true;
      })
    } catch (err) {
      return next(err);
    }
    return res.response(result, data);
  },
  update: async (req, res, next) => {
    let result = false;
    const { body, params } = req;
    try {
      const { items } = body;
      const newItems = {};
      if (items) {
        items.forEach(item => {
          newItems[item.item] = item.value;
        });
        body.items = newItems;
      }
      await projectRepository.update(params.id, body).then(project => {
        data = project
        result = true;
      })
    } catch (err) {
      return next(err);
    }
    return res.response(result, data);
  },
}