const User = require('@users/users.model.js');
const { validPassword, issueJWT } = require('@utils/PasswordManager.js');
const redisClient = require('@utils/RedisClient.js');

async function login(req, res, next) {
  const { email, password } = req.body;
  User.query().findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ success: false, msg: 'Could not find user' });
      }

      const isCorrect = validPassword(password, user.password, user.salt);

      if (isCorrect) {
        const tokenObject = issueJWT(user);
        return res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });
      }
      return res.status(401).json({ success: false, msg: 'You entered the wrong password' });
    })
    .catch((err) => {
      next(err);
    });
}
async function logout(req, res) {
  try {
    // await redisClient.LPUSH(req.user.id, req.jwtToken);
    return res.status(204).json({ success: true, message: 'Successfully logged out.' });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.toString() });
  }
}

module.exports = {
  login,
  logout
};
