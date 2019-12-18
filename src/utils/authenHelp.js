const jwt = require('jsonwebtoken');
const { secret } = require('../config/index');
const secretOrPrivateKey = secret;

const Token = {
  setToken: async payload => {
    try {
      return new Promise((resolve, reject) => {
        jwt.sign(
          payload,
          secretOrPrivateKey,
          {
            algorithm: 'HS256',
            expiresIn: '1d',
          },
          (err, token) => {
            if (err) {
              reject(err);
            }
            const length = parseInt(token.length / 3);
            const res = {
              token: token,
              one: token.slice(0, length),
              two: token.slice(length),
            };
            resolve(res);
          },
        );
      });
    } catch (error) {}
  },
  verifyToken: async token => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secretOrPrivateKey, (err, decoded) => {
        if (err || !decoded) {
          return resolve();
        }
        resolve(decoded);
      });
    });
  },
};

module.exports = Token;
