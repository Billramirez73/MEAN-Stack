var jwt = require('jsonwebtoken'),
  _ = require('lodash'),
  secret = process.env.JWT_SECRET,
  jwtDefaults = {};

function sign(payload, options) {
  return jwt.sign(payload, secret, _.extend(jwtDefaults, options || {}));
}

module.exports = {
  sign: sign
};
