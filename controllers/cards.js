const Card = require('../models/card');
const { hadleErrors } = require('./errors');

const getCards = (req, res) => Card.find({})
  .populate(['owner', 'likes'])
  .then((cards) => res.status(200).send(cards))
  .catch((err) => {
    hadleErrors(err, 'При запросе карточек возникла ошибка', res);
  });

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  return Card.findByIdAndRemove(cardId)
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card) return res.status(200).send(card);
      return res.status(404).send({ message: 'Карточка не найдена' });
    })
    .catch((err) => {
      hadleErrors(err, 'При удалении карточки возникла ошибка', res);
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const cardInfo = {
    name,
    link,
    owner: {
      _id: req.user._id,
    },
  };
  return Card.create(cardInfo)
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      hadleErrors(err, 'При создании карточки возникла ошибка', res);
    });
};

const setCardLike = (req, res) => {
  const { cardId } = req.params;
  return Card.findByIdAndUpdate(
    cardId,
    {
      $addToSet: { likes: req.user._id },
    },
    {
      new: true,
    },
  )
    .populate(['owner', 'likes'])
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      hadleErrors(err, 'Ошибка при добавлении лайка', res);
    });
};

const deleteCardLike = (req, res) => {
  const { cardId } = req.params;
  return Card.findByIdAndUpdate(
    cardId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    },
  )
    .populate(['owner', 'likes'])
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      hadleErrors(err, 'Ошибка при удалении лайка', res);
    });
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  setCardLike,
  deleteCardLike,
};
