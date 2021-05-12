// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const body_parser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
const port = 3000;

// Callback to debug
const listening = () => {
  console.log(`server is running on localHost: ${port}`);
};

// Spin up the server
const my_server = app.listen(port, listening);

// Add a GET route that returns the projectData object
const getData = (req, res) => {
  res.send(projectData);
};

app.get('/getData', getData);

// Post Route
const addData = (req, res) => {
  console.log(req.body);
  projectData = {
    temp: req.body.temp,
    date: req.body.date,
    feeling: req.body.feeling,
  };
  console.log(projectData);
  res.end();
};

app.post('/addData', addData);
