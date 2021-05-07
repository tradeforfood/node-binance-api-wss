const crypto = require("crypto");
const createSignature = (string, secret) =>
  crypto.createHmac("SHA256", secret).update(string).digest("hex");

module.exports = {
  createSignature,
};
