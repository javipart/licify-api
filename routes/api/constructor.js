const express = require('express');

const router = express.Router();
const routerBase = express.Router();

const controller = require('../../controllers/constructor.controller');

routerBase.route('/projects/:id')
  .get(controller.all);

routerBase.route('/:id')
  .get(controller.get);

routerBase.route('/')
  .post(controller.save);

router.use('/constructor', routerBase);


module.exports = router;