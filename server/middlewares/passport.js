const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = () => {
  // Local Strategy
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  },
  ((email, password, done) =>
  // 이 부분에선 저장되어 있는 User를 비교하면 된다.
    UserModel.findOne({ where: { email, password } })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }
        return done(null, user, { message: 'Logged In Successfully' });
      })
      .catch((err) => done(err))
  )));
};
