import isStrongPassword from "validator/lib/isStrongPassword";

export function isValidPassword(password) {
  if (!password) return "Please enter a password";

  if (isStrongPassword(password, { returnScore: true }) > 20) return "";

  return "Password not strong enough";
}

export function doPasswordsMatch(password, confirmPassword) {
  if (!confirmPassword) return "Please confirm your password";

  if (password === confirmPassword) return "";

  return "Passwords do not match";
}
