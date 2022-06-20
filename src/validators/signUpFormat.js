function validateSignUpFormat(user) {
  const isObject = typeof user === 'object';
  const hasTwoProperties = Object.entries(user).length === 2;
  const isUsernameFormatValid = typeof user.username === 'string';
  const isAvatarFormatValid = typeof user.avatar === 'string';
  return isObject && hasTwoProperties && isUsernameFormatValid && isAvatarFormatValid;
}

export default validateSignUpFormat;
