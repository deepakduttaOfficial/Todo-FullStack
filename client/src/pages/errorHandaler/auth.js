export const signupErrorHandaler = ({ name, email, password }) => {
  const errors = {};

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
    errors.email = "Invalid email address";

  if (password?.length < 3)
    errors.password = "Password must be at least 3 chars long";

  if (name?.length === 0) errors.name = "Name is required";

  return errors;
};
