const passport = require('passport')

module.exports = function (req, res, next) {
  console.log('checking authenticated')
  passport.authenticate('jwt', function (err, user) {
    if (err || !user) {
      res.status(400).send({
        error: 'You do not have access to this resource.'
      })
    } else {
      req.user = user
      next()
    }
  })(req, res, next)
}
