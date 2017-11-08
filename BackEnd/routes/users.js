var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoDB = 'mongodb://127.0.0.1/test';
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
var User = mongoose.model('User', userSchema);

// var Mike = new User({
//   username: "Mike",
//   password: "mike123"
// });
//
// Mike.save(function(err) {
//   if (err) throw err;
//   console.log('User saved successfully!');
// });

// User.find(
//   {
//     username: 'Mike'
//   },
//   function(err, results) {
//     try {
//       if (err) {
//         console.error('Mongo error is:', err);
//       } else {
//         mongoose.connection.close();
//         console.log(results);
//       }
//     } catch (e) {
//       console.error('Error is :', +e);
//     }
//   }
// ); // end Team.find

var users = [
  {
    username: 'Mike',
    password: 'mike123'
  },
  {
    username: 'Tom',
    password: 'tom123'
  },
  {
    username: 'John',
    password: 'john123'
  },
  {
    username: 'Mac',
    password: 'mac123'
  }
];


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/doLogin', function(req, res, next) {
  var reqUsername = req.body.username;
  var reqPassword = req.body.password;

  if (reqUsername && reqPassword) {
    //checking is the username is found in mongodb or Not
    User.find({ username: reqUsername }, function(err, results) {
      console.log('the results are' + results);
      if (err) console.log(err);
      else if (results.length == 0) {
        res
          .status(401)
          .json({ message: 'Login Failed. Incorrect username or password' });
      } else if (results[0].password == reqPassword) {
        res.status(201).json({ message: 'Login successful' });
      } else {
        res
          .status(401)
          .json({ message: 'Login Failed. Incorrect username or password' });
      }
    });
  } else {
    console.log('The user entered nothing. Sending 500 Status to Front End');
    res.status(500).json({ message: 'Enter a username and password' });
  }
});

router.post('/doSignUp', function(req, res, next) {
  var reqUsername = req.body.username;
  var reqPassword = req.body.password;

  console.log('Request to register username: ' + reqUsername);
  console.log('Password to register username: ' + reqPassword);

  if (reqUsername && reqPassword) {
    try {
      User.find({ username: reqUsername }, function(err, results) {
        if (err) console.log(err);
        else if (results.length != 0) {
          res.status(401).json({ message: 'Already signed up' });
        } else {
          var newuser = new User({
            username: reqUsername,
            password: reqPassword
          });
          newuser.save(function(err) {
            if (err) throw err;
            else {
              console.log('User is registered successfully!');
              res.status(201).json({ message: 'Signup successful' });
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(500).json({ message: 'Enter a username and password' });
  }
});

module.exports = router;
