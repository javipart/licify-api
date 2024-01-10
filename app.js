require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const apiUtils = require('./utils/apiUtils');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const driver = require('./drivers/mongo');
const { API_SECRET } = require('./utils/constants');
const app = express();
const jwt = require('jsonwebtoken');
const login = require('./routes/api/login');
const user = require('./routes/api/user');

const limiter = require('express-limiter')(app);

limiter({
  path: '/api/action',
  method: 'get',
  lookup: ['connection.remoteAddress'],
  total: 150,
  expire: 1000 * 60 * 60
});

async function mongoConnect() {
  try {
    await driver.connect();
  } catch (error) {
    console.error(error)
  }
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó un token.' });
  }

  jwt.verify(token, API_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido o expirado.' });
    }
    req.user = decoded;
    next();
  });
};

app.use((req, res, next) => {
  res.response = (success, data) => res.json({ success, data });
  next();
});

app.use(apiUtils);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/', require('./routes/index'));
app.use('/api/v1', login);
app.use('/api/v1', user);
app.use('/api/v1', verifyToken, require('./routes/api'));

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 202;
  res.status(statusCode);
  console.error(`${req.method} ${req.utils.getHost(req)}${req.path} ${statusCode} - ${err.message}`);
  res.json(req.utils.create_response(false, req.utils.format_error(err)));
});

mongoConnect();

module.exports = app;
