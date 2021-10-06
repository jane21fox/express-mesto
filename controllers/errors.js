const hadleErrors = (err, defMessage, res) => {
  let ERRCODE = 500;
  if (err.name === 'ValidationError') ERRCODE = 400;
  if (err.name === 'CastError') ERRCODE = 404;
  return res.status(ERRCODE).send({ message: defMessage });
};

module.exports = {
  hadleErrors,
};
