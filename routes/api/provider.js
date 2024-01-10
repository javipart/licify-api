const express = require('express');

const router = express.Router();
const routerBase = express.Router();

const controller = require('../../controllers/provider.controller');

routerBase.route('/projects/:id/applied')
  .get(controller.getApplied);

  routerBase.route('/projects/:id/not-applied')
  .get(controller.getNotApplied);

routerBase.route('/projects/:id')
  .get(controller.getById);

routerBase.route('/:id')
  .get(controller.get);

routerBase.route('/')
  .post(controller.save);

router.use('/provider', routerBase);


module.exports = router;