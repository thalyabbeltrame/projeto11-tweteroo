const validateTweetFormat = (tweet, username) => {
  return Object.entries(tweet).length === 1 && tweet.tweet !== undefined && username !== undefined;
};

export default validateTweetFormat;
