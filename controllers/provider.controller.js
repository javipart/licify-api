const ProjectRepository = require('../repositories/projectRepository');
const projectRepository = new ProjectRepository();

const getArrayPropousals = (projects, withPropousals = false, providerId) => {
  return projects.map(project => {
    let obj = [];
    Object.keys(project.items).map(item => {
      obj.push({ item: item, value: project.items[item] });
    });
    if (project.propousals.length && withPropousals) {
      project.propousals.map(propousal => {
        let username = '';
        if (project.providers) {
          const provider = project.providers.find(({ _id }) => _id.toString() === propousal.provider.toString());
          username = provider.username;
        } else {
          username = propousal.provider.username;
        }
        if (propousal.provider._id.toString() === providerId) {
          Object.keys(propousal.items).map(item => {
            let porjectItem = obj.find((o) => o.item === item);
            porjectItem[username] = propousal.items[item];
          });
        }
      });
    }
    project.items = obj;
    return project;
  });
}

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
      await projectRepository.create(body).then(project => {
        data = project
        result = true;
      })
    } catch (err) {
      return next(err);
    }
    return res.response(result, data);
  },
  getById: async (req, res, next) => {
    let result = false;
    let data = '';
    const { params } = req;
    const { id } = params;
    try {
      await projectRepository.getByProvider(id).then(projects => {
        data = getArrayPropousals(projects, true, id);
        result = true;
      })
    } catch (err) {
      return next(err);
    }
    return res.response(result, data);
  },
  getApplied: async (req, res, next) => {
    let result = false;
    let data = '';
    const { params } = req;
    const { id } = params;
    try {
      await projectRepository.findApplied(id).then(projects => {
        data = getArrayPropousals(projects, true, id);
        result = true;
      })
    } catch (err) {
      return next(err);
    }
    return res.response(result, data);
  },
  getNotApplied: async (req, res, next) => {
    let result = false;
    let data = '';
    const { params } = req;
    try {
      await projectRepository.getAll(params.id).then(projects => {
        data = data = getArrayPropousals(projects);
        result = true;
      })
    } catch (err) {
      return next(err);
    }
    return res.response(result, data);
  },
}