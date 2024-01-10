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
    let data = '';
    const { params } = req;
    const { id } = params;
    try {
      await projectRepository.getByConstructor(id).then(projects => {
        data = projects.map(project => {
          let obj = [];
          Object.keys(project.items).map(item => {
            obj.push({ item: item, value: project.items[item] });
          });
          if (project.propousals.length) {
            project.propousals.map(propousal => {
              Object.keys(propousal.items).map(item => {
                let porjectItem = obj.find((o) => o.item === item);
                porjectItem[propousal.provider.username] = propousal.items[item];
              });
            });
          }
          project.items = obj;
          return project;
        });
        result = true;
      })
    } catch (err) {
      return next(err);
    }
    return res.response(result, data);
  },
}