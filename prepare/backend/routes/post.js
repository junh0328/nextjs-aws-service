const express = require('express');

const router = express.Router();

const app = express();

app.post('/', (req, res) => {
  // POST /post
  res.send('post is listening!');
});

module.exports = router;
