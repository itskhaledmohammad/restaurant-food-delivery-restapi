const User = require('@users/users.model.js');
const { genPassword } = require('@utils/PasswordManager.js');

async function getUser(req, res) {
  const uid = req.params.id;
  const userInfo = await User.query().where('id', uid);
  res.status(200).json(...userInfo);
}

async function createUser(req, res) {
  const HashedSaltPass = genPassword(req.body.password);
  const { salt, hash: password } = HashedSaltPass;
  const { email, name, delivery_address } = req.body;

  try {
    const newUser = await User.query().insertAndFetch({
      email,
      name,
      password,
      salt,
      delivery_address
    });
    return res.status(201).json({
      email: newUser.email,
      name: newUser.name,
      delivery_address: newUser.delivery_address,
      created_at: newUser.created_at
    });
  } catch (err) {
    if (err.name === 'UniqueViolationError') {
      return res.status(409).json({ status: false, error: 'User already exists' });
    }
    return res.status(500).json({ status: false, error: err.name });
  }
}

async function updateUser(req, res) {
  const options = {
    noDelete: true, noRelate: true, noUnrelate: true, noInsert: true
  };

  const { name, delivery_address } = req.body;
  const uid = parseInt(req.params.id);

  let newUser = {};
  if (name) {
    newUser = { ...newUser, name };
  }
  if (delivery_address) {
    newUser = { ...newUser, delivery_address };
  }
  try {
    const result = await User.query().where('id', uid).patch(newUser);
    return res.status(201).json({ msg: 'User info updated.', result });
  } catch (err) {
    return res.status(500).json({ status: false, error: err.name, err: err.toString() });
  }
}

async function deleteUser(req, res) {
  const uid = req.params.id;

  try {
    await User.query().delete().where('id', uid);
    return res.status(200).json({ success: true, msg: `User Deleted.` });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.toString() });
  }
}

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser
};
