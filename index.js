/// importing the dependencies
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const port = process.env.PORT || 3001;
const dburi = process.env.DBURI;

const { Ad } = require("./models/ad");
const { User } = require("./models/user");

mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan("combined"));

// defining CRUD operations
app.get("/", async (req, res) => {
  res.send(await Ad.find());
});

app.post("/", async (req, res) => {
  console.log(req.body);
  const newAd = req.body;
  const ad = new Ad({
    name: newAd.name,
    price: newAd.price,
  });
  console.log(ad)
  await ad.save();
  res.send({ message: "New ad inserted." });
});

app.delete("/:id", async (req, res) => {
  await Ad.deleteOne({ _id: ObjectId(req.params.id) });
  res.send({ message: "Ad removed." });
});

app.put("/:id", async (req, res) => {
  console.log(`req.body: ${JSON.stringify(req.body)}`);  
  const newAd = req.body;
  await Ad.findOneAndUpdate({ _id: ObjectId(req.params.id) }, newAd);
  res.send({ message: "Ad updated." });
});

// login 

app.post("/auth", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const user = await User.findOne({ username });
  console.log(user);
  if (user && user.password === password) {
    console.log("User logged in.");
    res.send({ message: "User logged in." }).status(200);
  } else {
    res.send({ message: "Invalid credentials." }).status(401);
  }
});

// starting the server
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
  console.log("Database connected!");
});
