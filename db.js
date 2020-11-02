// 1ST DRAFT DATA MODEL
const mongoose = require('mongoose');

// users
// * our site requires authentication...
// * so users have a username and password
// * they also can have 0 or more lists
const User = new mongoose.Schema({
  // username provided by authentication plugin
  // password hash provided by authentication plugin
  lists:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }]
});

// an location in a course
// * includes the name, photo, and description of the place.
const Location = new mongoose.Schema({
  name: {type: String, required: true},
  photo: {type: String, min: 1, required: true},
  description: {type: String, required: true}
}, {
  _id: true
});

// a course list
// * each list must have a related user
// * a list can have 0 or more items
const Course = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  name: {type: String, required: true},
  loc: [Location],
  rating: {type: Number, default:0, required: true}
});

// TODO: add remainder of setup for slugs, connection, registering models, etc. below

