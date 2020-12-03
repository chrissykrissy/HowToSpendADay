const locStrategy = require('passport-local').Strategy;
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');

passport.use(new locStrategy({usernameField: 'email'}, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// passport.use(new locStrategy(function(email, password, done){
//     User.findOne({email:email},async function(err, user){
//         if (err){
//             console.log("1");
//             return done (null, false, {message : "No user with that email!"});
//         }
//         try {
//             if (await bcrypt.compare(password, usr.password)){
//                 console.log("2");
//                 return done (null, user);
//             }else{
//                 console.log("3");
//                 return done(null, false, {message: "Password incorrect"});
//             }
//         }catch(e){
//             console.log("4");
//             return done(e);
//         }
//     });
// }));

module.exports = function(){
    // passport.serializeUser((user, done) => {
    //     done(null, user._id);
    // });
    // passport.deserializeUser((id, done) => {
    //     User.findbyID(id, function(err, user){
    //         done(err,user);
    //     });
    //     // return done(null, getUserByID(id));
    // });
}