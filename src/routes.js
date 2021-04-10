const express = require('express');
const app = express();

app.use(require('./auth/auth.controller'));
app.use(require('./user/user.controller'));
app.use(require('./metric/metric.controller'));

module.exports = app;
