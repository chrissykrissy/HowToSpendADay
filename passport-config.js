const locStrategy = require('passport-local').Strategy;
// const User = mongoose.model('User');
const bcrypt = require('bcrypt');

function init (passport, getUsrByEmail, getUserByID){
    const authenticateUser =  async (email, password, done) => {
        console.log("HERE");
        const user = await getUsrByEmail(email)
        console.log(user);
        if (user == null){
            console.log("Null");
            return done (null, false, {message : "No user with that email!"});
        }
        try {
            if (await bcrypt.compare(password, user.password)){
                console.log("goood");
                return done (null, user);
            }else{
                console.log("incorrect");
                return done(null, false, {message: "Password incorrect"});
            }
        }catch(e){
            return done(e);
        }
    } 
    passport.use(new locStrategy({ usernameField : 'email'}, authenticateUser));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.serializeUser((id, done) => {
        return done(null, getUserByID(id));
    });
}


function init (passport, email, id){
    const authenticateUser =  async (email, password, done) => {
        console.log("HERE");
        User.find({email:email}, function(err,usr){
                if (err){
                    return done (null, false, {messagge : "No user with that email!"});
                }
                try {
                    if (await bcrypt.compare(password, usr.password)){
                        return done (null, usr);
                    }else{
                        return done(null, false, {message: "Password incorrect"});
                    }
                }catch(e){
                    return done(e);
                }
            });
    } 
    passport.use(new locStrategy({ usernameField : 'email'}, authenticateUser));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.serializeUser((id, done) => {
        return done(null, getUserByID(id));
    });
}



module.exports = init;