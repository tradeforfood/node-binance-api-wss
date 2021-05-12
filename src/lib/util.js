const crypto = require("crypto");
const createSignature = (string, secret = process.env.BINANCE_SECRET_KEY) =>
  crypto.createHmac("SHA256", secret).update(string).digest("hex");

module.exports = {
  createSignature,
};
