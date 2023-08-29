function camelToSnakeCase(str) {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

function generateRandomString(length) {
  return Math.random().toString(20).substr(2, length);
}

module.exports = {
  camelToSnakeCase,
  generateRandomString,
};
