const express = require('express');

const router = express.Router();
const routerBase = express.Router();

const controller = require('../../controllers/propousal.controller');


routerBase.route('/')
  .post(controller.create);

routerBase.route('/:ip')
  .get(controller.get);

router.use('/propousal', routerBase);


module.exports = router;