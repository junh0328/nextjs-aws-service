const express = require('express');
const dotenv = require('dotenv');

const postRouter = require('./routes/post');
const userRouter = require('./routes/user');

const db = require('./models');
const port = 3065;

dotenv.config(); // using .env file
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공!!!');
  })
  .catch(console.error);

app.get('/', (req, res) => {
  res.send('hello express!');
});

app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`server is listening on port : ${port}`);
});
