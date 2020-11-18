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
  name: {type: String},
  imageLink: {type:String},
  // photo: {type: String, min: 1, required: true},
  description: {type: String},
  rating: {type: String}
});

// a course list
// * each list must have a related user
// * a list can have 0 or more items
const Course = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  name: {type: String},
  loc: [Location],
  rating: {type: {type:String}}
});

mongoose.model('Course', Course);
mongoose.model('Location', Location);
mongoose.model('User', User);

// TODO: add remainder of setup for slugs, connection, registering models, etc. below

// is the environment variable, NODE_ENV, set to PRODUCTION? 
let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
 // if we're in PRODUCTION mode, then read the configration from a file
 // use blocking file io to do this...
 const fs = require('fs');
 const path = require('path');
 const fn = path.join(__dirname, 'config.json');
 const data = fs.readFileSync(fn);

 // our configuration file will be in json, so parse it and set the
 // conenction string appropriately!
 const conf = JSON.parse(data);
 dbconf = conf.dbconf;
} else {
 // if we're not in PRODUCTION mode, then use
 dbconf = 'mongodb://localhost/finalproj';
}

mongoose.connect(dbconf);
