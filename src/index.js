/// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const { Ad } = require('../models/ad');
const { User } = require('../models/user');

mongoose.connect('mongodb://localhost/adsdatabase');

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining CRUD operations
app.get('/', async (req, res) => {
  res.send(await Ad.find());
});

app.post('/', async (req, res) => {
  const newAd = req.body;
  const ad = new Ad(newAd);
  await ad.save();
  res.send({ message: 'New ad inserted.' });
});

app.delete('/:id', async (req, res) => {
  await Ad.deleteOne({ _id: ObjectId(req.params.id) })
  res.send({ message: 'Ad removed.' });
});

app.put('/:id', async (req, res) => {
  await Ad.findOneAndUpdate({ _id: ObjectId(req.params.id)}, req.body )
  res.send({ message: 'Ad updated.' });
});

// starting the server
app.listen(3001, () => {
  console.log('listening on port 3001');
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log("Database connected!")
});
