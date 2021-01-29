function isOwner(req, res, next) {
  if (req.user.id !== parseInt(req.params.id)) {
    return res.status(401).json({ status: false, error: `Unauthorized` });
  }
  next();
}

module.exports = {
  isOwner
};
