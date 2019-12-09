const bcrypt = require('bcrypt');
const { saltRounds } = require('../config/index');
const Password = {
  hash: async (password) => {
    try {
      const genSalt = () => {
        return new Promise((resolve, reject) => {
          bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
              reject(err);
            }
            resolve(salt);
          });
        });
      }
      const salt = await genSalt();

      const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) reject(err);
          resolve(hash);
        });
      })
      return hashedPassword
    } catch (error) {
      throw error;
    }
  },
  compare: async (password, hash) => {
    try {
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, res) => {
          // res == true
          if (err) reject(err);
          resolve(res);
        });
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Password;
