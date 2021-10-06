const User = require('../models/user');
const { hadleErrors } = require('./errors');

const getUsers = (req, res) => User.find({})
  .then((users) => res.status(200).send(users))
  .catch((err) => {
    hadleErrors(err, 'Пользователи не найдены', res);
  });

const getUser = (req, res) => {
  const { id } = req.params;
  return User.findById(id)
    .then((user) => {
      if (user) return res.status(200).send(user);
      return res.status(404).send({ message: 'Пользователь не найден' });
    })
    .catch((err) => {
      hadleErrors(err, 'При запросе информации о пользователе возникла ошибка', res);
    });
};

const createUser = (req, res) => User.create({ ...req.body })
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    hadleErrors(err, 'При создании пользователя возникла ошибка', res);
  });

const updateUser = (req, res) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => {
      if (user) return res.status(200).send(user);
      return res.status(404).send({ message: 'Пользователь не найден' });
    })
    .catch((err) => {
      hadleErrors(err, 'При изменении информации о пользователе возникла ошибка', res);
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => {
      if (user) return res.status(200).send(user);
      return res.status(404).send({ message: 'Пользователь не найден' });
    })
    .catch((err) => {
      hadleErrors(err, 'При изменении аватара пользователя возникла ошибка', res);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
};
