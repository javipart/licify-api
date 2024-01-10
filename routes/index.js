const express = require('express');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    const response = {
      status: 'Running',
    };
    return res.json(req.utils.create_response(true, response));
  });

module.exports = router;
