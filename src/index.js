const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fetch = require('node-fetch');

require('dotenv').config();

const app = express();

app.use(morgan('common'));
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    message: 'hello penta',
  });
});

const TWIITER_BASE_URL = 'https://api.twitter.com/1.1';

app.get('/tweets', async (req, res) => {
  const { q } = req.query;
  searchQuery =
    typeof q === 'string' && q.trim().length > 1 ? q.trim() : 'penguin';

  const response = await fetch(
    `${TWIITER_BASE_URL}/search/tweets.json?q=${searchQuery}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_TOKEN}`,
      },
    }
  );
  const json = await response.json();
  res.json(json);
});

app.get('/user/:username', async (req, res) => {
  const { username } = req.params;

  const response = await fetch(
    `${TWIITER_BASE_URL}/users/lookup.json?screen_name=${username}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_TOKEN}`,
      },
    }
  );
  const json = await response.json();
  res.json(json);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
