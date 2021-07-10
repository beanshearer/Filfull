export default function isRequired(name, value) {
  if (value) return "";

  return `${name} can't be blank`;
}
