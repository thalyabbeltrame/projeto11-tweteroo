const validateSignUpFormat = (loggedUser) => {
  return (
    Object.entries(loggedUser).length === 2 && loggedUser.username !== undefined && loggedUser.avatar !== undefined
  );
};

const validateSignUpFields = (loggedUser) => {
  const isUsernameValid = loggedUser.username.trim() !== '';
  const isAvatarValid = isURLImageValid(loggedUser.avatar);
  return isUsernameValid && isAvatarValid;
};

const isURLImageValid = (url) => {
  return (
    (url.startsWith('http') || url.startsWith('https')) &&
    url?.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
  );
};

const validateTweetFormat = (tweet, username) => {
  return typeof tweet === 'string' && typeof username === 'string';
};

const validateTweetFields = (tweet) => {
  const isUsernameValid = tweet.username.trim() !== '';
  const isTweetValid = tweet.tweet.trim() !== '';
  return isUsernameValid && isTweetValid;
};

export default { validateSignUpFormat, validateSignUpFields, validateTweetFormat, validateTweetFields };
