import passport from 'passport';
let LocalStrategy = require('passport-local').Strategy;
import hashPass from './hashPass';
import userRepo from '../api/graphql/datasources/UserRepo';
const UserRepo = new userRepo();

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await UserRepo.loginUserName({ username });
    if (!user) return done(null, false, { message: 'Incorrect username.' });
    let chechPassword = await hashPass.compare(password, user.password);
    if (!chechPassword) return done(null, false, { message: 'Incorrect password.' });
    let results = {
      userId: user._id,
      userName: user.userName,
      role: user.role,
    };
    return done(null, results);
  }),
);

export default passport;
