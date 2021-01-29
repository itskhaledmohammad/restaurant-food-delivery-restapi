const User = require('@users/users.model.js');
const { genPassword } = require('@utils/PasswordManager.js');

async function getUser(req, res) {
  const uid = req.params.id;
  const userInfo = await User.query().where('id', uid);
  res.status(200).json(userInfo);
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
    return res.status(201).json(newUser);
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
  const uid = req.params.id;

  let updatedUser = { id: uid };
  if (name) {
    updatedUser = { ...updateUser, name };
  }
  if (delivery_address) {
    updatedUser = { ...updateUser, delivery_address };
  }
  try {
    await User.query().upsertGraph(updatedUser, options);
    return res.status(201).json('User info updated.');
  } catch (err) {
    return res.status(500).json({ status: false, error: err.name });
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
