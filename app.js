const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routes = require('./routes');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');

const PORT = 3000;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});
app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use(routes);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message, name } = err;
  if (name === 'ValidationError') {
    res.status(400)
      .send({
        // message: Object.values(err.errors).map((key) => err.errors[key].message).join(),
        message,
      });
  } else {
    res.status(statusCode)
      .send({
        message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
      });
  }
});

app.listen(PORT, () => {});
