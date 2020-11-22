const bcrypt = require('bcrypt');

class Router {

  constructor(app, db) {
    this.login(app, db);
    this.jobs(app, db);
    this.accept(app, db);
  }

  login(app, db) {

    app.post('/login', (req, res) => {

      let username = req.body.username;
      let password = req.body.password;

      username = username.toLowerCase();

      let cols = [username];
      db.query('SELECT * FROM user WHERE username = ? LIMIT 1', cols, (err, data, fields) => {

        if (err) {
          res.json({
            success: false,
            msg: 'An error occured, please try again'
          })
          return;
        }

        //Found a user
        if (data && data.length === 1) {

          bcrypt.compare(password, data[0].password, (bcryptErr, verified) => {

            if (verified) {
              res.json({ success: true })
            }

            else {
              res.json({
                success: false,
                msg: 'Password is incorrect'
              })
            }

          });
        }

        else {
          res.json({
            success: false,
            msg: 'That user does not exist'
          })
        }


      });

    });
  }

  jobs(app, db) {

    app.get('/jobs', (req, res) => {

      db.query("SELECT * FROM jobs WHERE status = 'Available'", (err, data, fields) => {

        if (err) {
          res.json({
            success: false,
            msg: 'An error occured, please try again'
          })
          return;
        }

        //Found some available jobs
        if (data.length > 0) {
          res.send(data);
        }

        else {
          res.json({
            success: false,
            msg: 'No available jobs found'
          })
        }


      });

    });
  }

  accept(app, db) {

    app.put('/accept', (req, res) => {

      let id = req.body.id;

      let cols = [id];
      db.query("UPDATE jobs SET status = 'Accepted' WHERE id = ?", cols, (err, data, fields) => {

        if (err) {
          res.json({
            success: false,
            msg: 'An error occured, please try again'
          })
          return;
        }
        else {
          res.json({
            success: true
            
          })
        }

          

      });

    });

  }


}

module.exports = Router;