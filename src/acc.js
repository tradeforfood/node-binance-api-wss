const axios = require("axios");
const { createSignature } = require("./lib/util.js");

const {
  BINANCE_API_KEY,
  BINANCE_SECRET_KEY,
  BINANCE_HOST = "https://api.binance.com",
} = process.env;

const getAccInfo = async (recv = 50_000) => {
  try {
    let qr = `recvWindow=${recv}&timestamp=${+new Date()}`;
    const sig = createSignature(qr, BINANCE_SECRET_KEY);
    qr += `&signature=${sig}`;
    const options = {
      method: "GET",
      headers: { "X-MBX-APIKEY": BINANCE_API_KEY },
      url: `${BINANCE_HOST}/api/v3/account?${qr}`,
    };
    const { data } = await axios(options);
    return data;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  getAccInfo,
};

