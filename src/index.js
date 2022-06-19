import express from 'express';
import cors from 'cors';
import chalk from 'chalk';

import validateSignUpFormat from './validators/signUpFormat.js';
import validateSignUpFields from './validators/signUpFields.js';
import validateTweetFormat from './validators/tweetFormat.js';
import validateTweetFields from './validators/tweetFields.js';

const app = express();
app.use([express.json(), cors()]);

let users = [];
let tweets = [];

app.post('/sign-up', (req, res) => {
  const loggedUser = req.body;
  const isSignUpFormatValid = validateSignUpFormat(loggedUser);
  if (!isSignUpFormatValid) {
    res.sendStatus(400);
    return;
  }
  const areSignUpFieldsValid = validateSignUpFields(loggedUser);
  if (!areSignUpFieldsValid) {
    res.status(400).send('Todos os campos são obrigatórios!');
    return;
  }
  const usernameAlreadyExists = users.some((user) => user.username === loggedUser.username);
  if (usernameAlreadyExists) {
    res.status(400).send('Esse usuário já existe!');
    return;
  }
  users.push(loggedUser);
  res.status(201).send('Ok');
});

app.post('/tweets', (req, res) => {
  const body = req.body;
  const username = req.header('User');
  const isTweetFormatValid = validateTweetFormat(body, username);
  if (!isTweetFormatValid) {
    res.sendStatus(400);
    return;
  }
  const areTweetFieldsValid = validateTweetFields(body, username);
  if (!areTweetFieldsValid) {
    res.status(400).send('Todos os campos são obrigatórios!');
    return;
  }
  const usernameExists = users.some((user) => user.username === username);
  if (!usernameExists) {
    res.status(400).send('Esse usuário não existe!');
    return;
  }
  tweets.unshift({ username: username, tweet: body.tweet });
  res.status(201).send('Ok');
});

app.get('/tweets', (req, res) => {
  const page = Number(req.query.page);
  if (isNaN(page) || page < 1 || page % 1 !== 0) {
    res.status(400).send('Informe uma página válida!');
    return;
  }
  const tweetsToSend = tweets.slice((page - 1) * 10, page * 10).map((tweet) => {
    return { ...tweet, avatar: users.find((user) => user.username === tweet.username).avatar };
  });
  res.send(tweetsToSend);
});

app.get('/tweets/:username', (req, res) => {
  const username = req.params.username;
  const userInfos = users.find((user) => user.username === username);
  if (!userInfos) {
    res.status(400).send('Usuário não encontrado!');
    return;
  }
  const tweetsToSend = tweets
    .filter((tweet) => tweet.username === username)
    .map((tweet) => {
      return { ...tweet, avatar: userInfos.avatar };
    });
  res.send(tweetsToSend);
});

app.listen(5000, () => {
  console.log(chalk.blue('O servidor está rodando na porta 5000!'));
});
