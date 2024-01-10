const express = require('express');

const router = express.Router();
const routerBase = express.Router();

const controller = require('../../controllers/project.controller');

routerBase.route('/all')
  .get(controller.all);

routerBase.route('/:id')
  .get(controller.get)
  .put(controller.update);

routerBase.route('/')
  .post(controller.save);

router.use('/project', routerBase);


module.exports = router;