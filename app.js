const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const PORT = 3000;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '615ddc8c9aaa76276cef062f',
  };

  next();
});

app.use(routes);

app.listen(PORT, () => {});
