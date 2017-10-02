const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('Express server running');
});

app.post('/login', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  res.send('Success');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server is running...');
});
