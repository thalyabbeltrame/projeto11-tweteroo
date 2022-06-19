const validateTweetFields = (tweet, username) => {
  const isUsernameValid = username.trim() !== '';
  const isTweetValid = tweet.tweet.trim() !== '';
  return isUsernameValid && isTweetValid;
};

export default validateTweetFields;
