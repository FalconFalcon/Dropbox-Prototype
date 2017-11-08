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


module.exports = router;
