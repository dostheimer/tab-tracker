const Promise = require('bluebird')
const bcrypt = require('bcrypt')
const SALT_FACTOR = 8

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true}
});

UserSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, SALT_FACTOR)
    .then(hash => {
      user.password = hash;
      next();
    })
})

UserSchema.methods.comparePassword = function(password) {
  console.log('called method')
  return bcrypt.compare(password, this.password)
};

module.exports = mongoose.model('User', UserSchema);
