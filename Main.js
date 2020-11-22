const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const Router = require('./Router');
const { Console } = require('console');

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

//Database

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rapid'
});

db.connect(function(err) {
  if (err) {
    console.log('database error');
    throw err;
    return false;
  }
});


new Router(app, db);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server is up and listening on: ' + PORT)
});