export const validateUserName = (username) => {
  return !(!username || username.length < 8);
};

export const validatePassword = (password) => {
  return !(!password || password.length < 8);
};

export const validateNormalForm = (string) => {
  return string;
};
