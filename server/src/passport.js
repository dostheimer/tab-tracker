const passport = require('passport')
const {User} = require('./models')
const config = require('./config/config')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.authentication.jwtSecret
}
passport.use(
  new JwtStrategy(opts, async function (jwtPayload, done) {
    try {
      const user = await User.findOne({
        id: jwtPayload.id
      })
      if (!user) {
        return done(new Error(), false)
      }
      return done(null, user)
    } catch (err) {
      return done(new Error(), false)
    }
  })
)

module.exports = null
