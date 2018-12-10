const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegistration(data) {
  let errors = {};
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  //Validation errors for register input fields
  if (!Validator.isLength(data.firstname, { min: 2, max: 30 })) {
    errors.firstname = "First name must be between 2 and 30 charcters";
  }
  if (!Validator.isAlpha(data.firstname)) {
    errors.firstname = "First name must be letters only";
  }
  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = "First name is required";
  }
  if (!Validator.isLength(data.lastname, { min: 2, max: 30 })) {
    errors.lastname = "Last name must be between 2 and 30 charcters";
  }
  if (Validator.isEmpty(data.lastname)) {
    errors.lastname = "Last name is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at between 6 and 30 charcters";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  //return any errors
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
