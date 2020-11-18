require('./db');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const passport = require('passport');
const Strategy = require('passport-google-oauth20').Strategy;

const mongoose = require('mongoose');
const Location = mongoose.model('Location');
const Course = mongoose.model('Course');
const User = mongoose.model('User');

// enable sessions
const session = require('express-session');
const sessionOptions = {
    secret: 'secret cookie thang (store this elsewhere!)',
    resave: true,
      saveUninitialized: true
};
app.use(session(sessionOptions));


const logger = (req, res, next) => {
  console.log(req.method, req.path, req.query);
  next();
};
app.use(logger);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// body parser setup
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

//help from https://github.com/passport/express-4.x-facebook-example 

// passport.use(new Strategy({
//   clientID: process.env['GOOGLE_CLIENT_ID'],
//   clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
//   callbackURL: "/return"
// },
// function(accessToken, refreshToken, profile, cb) {
//   User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     return cb(err, user);
//   });
// }
// ));

// app.get('/login', function(req, res){
//   res.render('login');
// });

// app.get('/login/google',
//   passport.authenticate('google', { scope: ['profile'] }));

// app.get('/login/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });

app.get('/', (req, res) => {
  Location.find(req.query, function(err,locs){
    res.render('index', {locArr: locs});
  });
});

app.get('/add', (req,res)=>{
  res.render('add');
});

app.post('/add', function(req,res){
  const newL = new Location(req.body);
  // console.log(newL);
  newL.save((err,saved)=>{
    if (err){
        console.log("Error: NOT POSSIBLE TO ADD");
    }else{
        console.log("Saved: ", saved);
        res.redirect('/');
    }
  });
});

app.get('/browse', (req,res) =>{
  Course.find((err, c) => {
    res.render('browse',{courses : c});
  });
})

app.get('/addCourse', (req, res) =>{
  Location.find((err, locs) =>{
    // console.log(locs);
    res.render('addCourse', {locations : locs});
  });
});

app.post('/addCourse', function(req,res){
  console.log(req.body);
  const name = req.body.name;
  // const loc = req.body.loc;
  const newC = new Course({"name": name, "loc": Location.find({"name" : req.body.loc}).exec()});
  // console.log(req.body);
  newC.save((err, saved) =>{
    if (err){
      console.log(err);
    }else{
      console.log("Saved: ", saved);
      res.redirect('/browse');
    }
  });
});

app.get('/map', function(req, res){
  res.render('map');
})





app.listen(process.env.PORT || 5000);
