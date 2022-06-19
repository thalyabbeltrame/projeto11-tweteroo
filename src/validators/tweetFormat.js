const validateTweetFormat = (body, username) => {
  const isBodyObject = typeof body === 'object';
  const hasOneProperty = Object.entries(body).length === 1;
  const isUsernameFormatValid = typeof username === 'string';
  const isTweetFormatValid = typeof body.tweet === 'string';
  return isBodyObject && hasOneProperty && isUsernameFormatValid && isTweetFormatValid;
};

export default validateTweetFormat;
