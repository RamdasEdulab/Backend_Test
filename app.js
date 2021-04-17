const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./DB/mongoclient');
var ImageData = require('./router/imageData');
var app = express();
app.use(bodyParser.json());
app.use('/api', ImageData);
app.listen(3232, () => console.log('Server started at port : 3232'));