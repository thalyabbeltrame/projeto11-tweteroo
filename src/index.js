import express from 'express';
import cors from 'cors';
import chalk from 'chalk';

const app = express();
app.use(express.json());
app.use(cors());

let users = [];
let tweets = [];

app.post('/sign-up', (req, res) => {
  const loggedUser = req.body;
  console.log(loggedUser);
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
  const page = Number(req.query.page);
  if (isNaN(page) || page < 1 || page % 1 !== 0) {
    res.status(400).send('Informe uma página válida!');
    return;
  }

  const minLimit = (page - 1) * 10;
  const maxLimit = page * 10;
  const tweetsToSend = tweets.slice(minLimit, maxLimit).map((tweet) => {
    return { ...tweet, avatar: users.find((user) => user.username === tweet.username).avatar };
  });
  res.send(tweetsToSend);
});

app.get('tweets/:username', (req, res) => {
  const username = req.params.username;
  const user = users.find((user) => user.username === username);
  if (!user) {
    res.status(400).send('Usuário não encontrado!');
    return;
  }

  const tweetsToSend = tweets
    .filter((tweet) => tweet.username === username)
    .map((tweet) => {
      return { ...tweet, avatar: user.avatar };
    });
  res.send(tweetsToSend);
});

app.listen(5000, () => {
  console.log(chalk.blue('O servidor está rodando na porta 5000'));
});
