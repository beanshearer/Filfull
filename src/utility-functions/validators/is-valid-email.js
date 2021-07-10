import isEmail from "validator/lib/isEmail";

export default function isValidEmail(email, presence) {
  if (presence && !email) return "Please enter an email address";

  if (isEmail(email)) return "";

  return `${email} is not a valid email address`;
}
