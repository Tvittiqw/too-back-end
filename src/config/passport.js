const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const config = require('./config');
const { tokenTypes } = require('./tokens');
const { User } = require('../models');
const { userService, tokenService } = require('../services');

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const googleConfig = {
  clientID: config.google.clientID,
  clientSecret: config.google.clientSecret,
  callbackURL: config.google.callbackURL,
  passReqToCallback: config.google.passReqToCallback,
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const googleVerify = async (request, accessToken, refreshToken, profile, done) => {
  try {
    let user = await userService.getUserByEmail(profile.email);
    if (user) {
      if (!user.google) {
        user = await User.updateUserById(user.id, {
          google: {
            id: profile.id,
            token: profile.accessToken,
            email: profile.email,
            name: profile.displayName,
          },
        });
      }
      const tokens = await tokenService.generateAuthTokens(user);
      return done(null, { user, tokens }, request);
    }
    const userObj = {
      provider: profile.provider,
      firstName: profile.given_name,
      lastName: profile.family_name,
      email: profile.email,
      photo: profile._json.picture,
      id: profile.id,
      token: accessToken,
      google: {
        id: profile.id,
        token: profile.accessToken,
        email: profile.email,
        name: profile.displayName,
      },
    };

    const newUser = await User.create(userObj);
    const tokens = await tokenService.generateAuthTokens(newUser);
    return done(null, { newUser, tokens }, request);
  } catch (error) {
    console.log('error', error);
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
const googleStrategy = new GoogleStrategy(googleConfig, googleVerify);

module.exports = {
  jwtStrategy,
  googleStrategy,
};
