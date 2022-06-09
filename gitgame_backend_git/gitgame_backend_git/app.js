const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('router/routes.js');
const app = express();


app.use(cors());
app.use(bodyParser());

app.use('/', router);


module.exports = app;