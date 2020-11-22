const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const Router = require('./Router');
const { Console } = require('console');

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

//Database

var dbConfig = {
  host: 'us-cdbr-east-02.cleardb.com',
  user: 'bccf3b9f4740a9',
  password: 'f56ade09',
  database: 'heroku_bdbaf8607a93536'
}

var db;

function handleDisconnect() {
  db = mysql.createConnection(dbConfig);
  db.connect( function onConnect(err) {
    if (err) {
      console.log('Error when connecting to the ClearDB database: ' + err);
      setTimeout(handleDisconnect, 10000);
    }
  });

  db.on('error', function onError(err) {
    console.log('db error', err);
    if (err.code == 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    }
    else {
      throw err;
    }
  });


}

handleDisconnect();

// const db = mysql.createConnection({
//   host: 'us-cdbr-east-02.cleardb.com',
//   user: 'bccf3b9f4740a9',
//   password: 'f56ade09',
//   database: 'heroku_bdbaf8607a93536'
// });

// db.connect(function(err) {
//   if (err) {
//     console.log('database error');
//     throw err;
//   }
// });


new Router(app, db);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server is up and listening on: ' + PORT)
});