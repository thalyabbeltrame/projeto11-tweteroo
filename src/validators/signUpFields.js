const validateSignUpFields = (loggedUser) => {
  const isUsernameValid = loggedUser.username.trim() !== '';
  const isAvatarValid = validateImageURL(loggedUser.avatar);
  return isUsernameValid && isAvatarValid;
};

const validateImageURL = (url) => {
  return (
    (url.startsWith('http') || url.startsWith('https')) &&
    url?.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
  );
};

export default validateSignUpFields;
