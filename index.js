import express from 'express';
import cors from 'cors';
import chalk from 'chalk';

const app = express();
app.use(express.json());
app.use(cors());

let users = [];
let tweets = [];
let loggedUser = {};

app.post('/sign-up', (req, res) => {
  loggedUser = { ...req.body };
  users.push(loggedUser);
  res.send('Ok');
});

app.post('/tweets', (req, res) => {
  const tweet = { ...req.body, avatar: loggedUser.avatar };
  tweets.push(tweet);
  res.send('Ok');
});

app.get('/tweets', (req, res) => {
  const last10Tweets = tweets.reverse().slice(0, 10);
  res.send(last10Tweets);
});

app.listen(5000, () => {
  console.log(chalk.blue('O servidor está rodando na porta 5000'));
});
