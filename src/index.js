import express from 'express';
import cors from 'cors';
import chalk from 'chalk';

import validateSignUpFormat from './utils/validators.js';
import validateSignUpFields from './utils/validators.js';
import validateTweetFormat from './utils/validators.js';
import validateTweetFields from './utils/validators.js';

const app = express();
app.use(express.json());
app.use(cors());

let users = [];
let tweets = [];

app.post('/sign-up', (req, res) => {
  const loggedUser = req.body;
  const areSignUpFormatValid = validateSignUpFormat(loggedUser);

  if (!areSignUpFormatValid) {
    res.sendStatus(400);
    return;
  }

  const areSignUpInfosValid = validateSignUpFields(loggedUser);
  if (areSignUpInfosValid) {
    users.push(loggedUser);
    res.status(201).send('Ok');
  } else {
    res.status(400).send('Todos os campos são obrigatórios!');
  }
});

app.post('/tweets', (req, res) => {
  const tweet = req.body;
  const username = req.header('user');
  const areTweetFormatValid = validateTweetFormat(tweet, username);
  if (!areTweetFormatValid) {
    res.sendStatus(400);
    return;
  }

  const areTweetInfosValid = validateTweetFields(tweet, username);
  if (areTweetInfosValid) {
    tweets.unshift({ username: username, tweet: tweet });
    res.status(201).send('Ok');
  } else {
    res.status(400).send('Todos os campos são obrigatórios!');
  }
});

app.get('/tweets', (req, res) => {
  const lastTenTweets = tweets.slice(0, 10).map((tweet) => {
    return { ...tweet, avatar: users.find((user) => user.username === tweet.username).avatar };
  });
  res.send(lastTenTweets);
});

app.listen(5000, () => {
  console.log(chalk.blue('O servidor está rodando na porta 5000'));
});
