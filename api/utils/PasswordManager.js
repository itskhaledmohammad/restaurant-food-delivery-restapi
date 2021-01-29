const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const { DateTime } = require('luxon');

function validPassword(password, hash, salt) {
  const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === hashVerify;
}

function genPassword(password) {
  const salt = crypto.randomBytes(32).toString('hex');
  const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

  return {
    salt,
    hash: genHash,
  };
}

/**
 * @param {*} user
 */
function issueJWT(user) {
  const { id } = user;
  const pathToKey = './keys/id_rsa_priv.pem';
  const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');
  const expiresIn = '1d';

  const payload = {
    sub: id,
    iat: DateTime.local().plus({ days: 1 }).toSeconds()
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn, algorithm: 'RS256' });

  return {
    token: `Bearer ${signedToken}`,
    expires: expiresIn,
  };
}

function genKeyPair() {
  const keyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
  });

  try {
    fs.writeFileSync(`./keys/id_rsa_pub.pem`, keyPair.publicKey);
    fs.writeFileSync(`./keys/id_rsa_priv.pem`, keyPair.privateKey);
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  validPassword,
  genPassword,
  issueJWT,
  genKeyPair,
};
