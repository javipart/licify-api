const express = require('express');

const router = express.Router();
const routerBase = express.Router();

const controller = require('../../controllers/image.controller');

routerBase.route('/:ip')
  .get(controller.get);

router.use('/image', routerBase);


module.exports = router;