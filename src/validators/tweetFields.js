const validateTweetFields = (body, username) => {
  const isUsernameValid = username.trim() !== '';
  const isTweetValid = body.tweet.trim() !== '';
  return isUsernameValid && isTweetValid;
};

export default validateTweetFields;
