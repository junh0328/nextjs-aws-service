const express = require('express');

const router = express.Router();

const app = express();

app.post('/', (req, res) => {
  // POST /user
  res.send('user is listening!');
});

module.exports = router;
