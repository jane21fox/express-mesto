const hadleErrors = (err, defMessage, res) => {
  let ERRCODE = 500;
  if (err.name === 'ValidationError' || err.name === 'CastError') ERRCODE = 400;
  return res.status(ERRCODE).send({ message: defMessage });
};

module.exports = {
  hadleErrors,
};
