const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const fs = require('fs');
const { DateTime } = require('luxon');
const redisClient = require('@utils/RedisClient.js');
const User = require('../api/users/users.model');

const pathToKey = './keys/id_rsa_pub.pem';
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'],
  passReqToCallback: true
};

module.exports = (passport) => {
  passport.use(new JwtStrategy(options, (async (req, jwtPayload, done) => {
    let err = null;
    let user = null;
    const blacklisted = false;
    try {
      user = await User.query().findById(jwtPayload.sub);
    } catch (e) {
      err = e;
    }

    // try {
    //   const result = await redisClient.lrange(user.id, 0, 99999999);
    //   if (result.indexOf(token) > -1) {
    //     blacklisted = true;
    //   }
    // } catch (e) {
    //   err = e;
    // }
    const timeNow = DateTime.local().toSeconds();
    const expires = jwtPayload.iat;

    if ((!user || err) && !blacklisted) {
      req.user = user;
      req.jwtToken = jwtPayload;
      return done(err, false);
    }
    if (timeNow >= expires) {
      return done(err, false);
    }
    if (user || blacklisted) {
      return done(null, user);
    }
    return done(null, false);
  })));
};
