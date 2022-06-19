function validateSignUFormat(loggedUser) {
  const isObject = typeof loggedUser === 'object';
  const hasTwoProperties = Object.entries(loggedUser).length === 2;
  const isUsernameFormatValid = typeof loggedUser.username === 'string';
  const isAvatarFormatValid = typeof loggedUser.avatar === 'string';
  return isObject && hasTwoProperties && isUsernameFormatValid && isAvatarFormatValid;
}

export default validateSignUFormat;
