require('./db');

if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOW = require('method-override');

const app = express();
app.use(methodOW('_method'));

const passport = require('passport');
const initpprt = require('./passport-config1');
initpprt();
// initpprt(passport, email => {
//   User.findOne({email : email}, (err, usr) => {
//     if (err){
//       console.log(err);
//       // return null;
//     }else{
//       console.log(usr);
//       // return usr;
//     }
//   }).exec;},
//   id => {
//     User.find({id : id}, (err, usr) => {
//       if (err){
//         // return null;
//       }else{
//         // return usr;
//       }
//     });
//   }
// );

const flash = require('express-flash');
app.use(flash());
const bcrypt = require('bcrypt');

const Location = mongoose.model('Location');
const Course = mongoose.model('Course');
const User = mongoose.model('User');

// enable sessions
const session = require('express-session');
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
};
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());


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


app.get('/login',checkNotAuth, function(req, res){
  res.render('login', {message : req.flash('message')});
});

app.post('/login', checkNotAuth, passport.authenticate('local', {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash: true
  }));

app.get('/register',checkNotAuth, function(req, res){
  res.render('register');
});

app.post('/register',checkNotAuth, async (req, res) => {
  try {
    const hashedpwd = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name : req.body.name,
      email : req.body.email,
      password : hashedpwd
    });
    newUser.save((err, saved) => {
      if (err){
        console.log(err);
      }else{
        console.log("Saved: ", saved);
        res.redirect('/login');
      }
    });
  }catch{
    res.redirect('/register');
  }
});

function checkAuth(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/login')
}

function checkNotAuth(req, res, next){
  if (req.isAuthenticated()){
    return res.redirect('/');
  }
  next();
}

app.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

// app.get('/login/google',
//   passport.authenticate('google', { scope: ['profile'] }));

// app.get('/login/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });

app.get('/', checkAuth, (req, res) => {
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
    console.log(c);
    res.render('browse',{courses : c});
  }).exec();
})

app.get('/addCourse', (req, res) =>{
  Location.find((err, locs) =>{
    // console.log(locs);
    res.render('addCourse', {locations : locs});
  });
});

app.post('/addCourse', function(req,res){
  // console.log(req.body);
  // const name = req.body.name;
  // const loc = req.body.loc;
  const newC = new Course({
    name : req.body.name,
    loc : Location.findOne({name: req.body.loc}, function(err, loca, count){
      console.log(err, loca, count);
    })});
  // const newC = new Course({"name": name, "loc": Location.find({"name" : req.body.loc}).exec()});
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
});

app.get('/rate', function(req, res){
  Course.find((err, cors) =>{
    // console.log(locs);
    res.render('rate', {courses : cors});
  });
});

mongoose.set('useFindAndModify', false);


app.post('/rate', (req, res) => {
  // Course.findOne({name : req.body.name}, function(err, cs){
  //   cs.rating.push({rating: req.body.star});
  //   cs.save(function(err, saved) {
  //     if(!err){
  //       console.log(saved);
  //     }
  //   });
  Course.findOneAndUpdate({name: req.body.name}, {$push : {rating: req.body.star}}, function(err, updated){
    console.log(err, updated);
    console.log(updated.rating);
    res.redirect('/browse');
  });
});





app.listen(process.env.PORT || 5000);
