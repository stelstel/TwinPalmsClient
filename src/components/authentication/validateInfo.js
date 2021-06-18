/* eslint-disable no-undef */
const validation = (values) => {
  let errors = {};

  if (!values.UserName) {
    errors.UserName = "Username is required.";
  } else if (!values.UserName) {
    errors.UserName = "User name is invalid";
  }

  if (!values.Password) {
    errors.Password = "Password is required.";
  } else if (values.Password.length < 5) {
    errors.Password = "Password must be at least 6 characters.";
  }
  return errors;
};

export default validation;
