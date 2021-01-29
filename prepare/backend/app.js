const express = require('express');
const port = 3065;

const app = express();

app.get('/', (req, res) => {
  res.send('hello express!');
});

app.listen(port, () => {
  console.log('server is listening on port : ' + port);
});
