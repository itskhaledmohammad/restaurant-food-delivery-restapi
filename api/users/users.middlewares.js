function isOwner(req, res, next) {
  if (req.user.id !== req.params.id) {
    return res.status(401).json({ status: false, error: `Unauthorized to modify user ${req.params.id}` });
  }
  next();
}

module.exports = {
  isOwner
};
