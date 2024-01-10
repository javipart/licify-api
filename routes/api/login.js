const express = require('express');

const router = express.Router();
const routerBase = express.Router();

const controller = require('../../controllers/auth.controller');

routerBase.route('/')
  .post(controller.login);

router.use('/login', routerBase);


module.exports = router;