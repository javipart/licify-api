const express = require('express');

const router = express.Router();
const routerBase = express.Router();

const controller = require('../../controllers/user.controller');


routerBase.route('/')
  .post(controller.save);

router.use('/user', routerBase);


module.exports = router;