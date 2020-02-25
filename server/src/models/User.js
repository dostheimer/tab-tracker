const Promise = require('bluebird')
const bcrypt = require('bcrypt')

function hashPassword (user) {
  const SALT_FACTOR = 8

  if (!user.changed('password')) {
    return;
  }
  return bcrypt
    .hash(user.password, SALT_FACTOR)
    .then(hash => {
      console.log('Hash Value: ' + hash)
      user.setDataValue('password', hash)
    })
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword
    }
  })

  User.prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password)
  }

  return User
}