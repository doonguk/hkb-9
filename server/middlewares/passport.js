const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../config/db');
const User = require('../model/user');
const { verifyPassword } = require('../utils/salt');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
  });
  // 질문) 세션 안쓰면 무용지물인가?
  // 일단 세션 안쓰더라도, Strategy 성공 시 호출 > 다음 미들웨어로 넘김
  // 두번쨰 인자로 전달하는 변수명으로 req 객체에 붙음 -> req.user

  // passport.deserializeUser((user, done) => {
  //   done(null, user);
  // });
  // 서버로 오는 요청에 대해 세션에 저장된 데이터와 DB 데이터를 비교함.
  // 일단 세션 안쓰니 주석처리

  passport.use(new LocalStrategy({
    usernameField: 'loginId',
    passwordField: 'password',
  }, async (loginId, password, done) => {
    const connection = await pool.getConnection();
    try {
      const user = await User.checkUserOne(connection, loginId);
      if (!user) {
        return done(null, false, { message: 'Not Found User' }); // 3번째 인자는 사용자(?)에러 -> 없는 유저, 비번 틀리거나 등
      }
      if (verifyPassword(password, user.password, user.salt)) {
        return done(null, user); // 로그인 성공!
      }
      connection.release();
      return done(null, false, { message: 'invalid password' }); // 비번 틀림
    } catch (e) {
      connection.release();
      return done(e); // done 의 첫번째 인자는 디비에러 같은 서버에러 지정해줌.
    }
  }));
};
