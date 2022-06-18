const validateSignUpFormat = (loggedUser) => {
  return (
    Object.entries(loggedUser).length === 2 && loggedUser.username !== undefined && loggedUser.avatar !== undefined
  );
};

export default validateSignUpFormat;
