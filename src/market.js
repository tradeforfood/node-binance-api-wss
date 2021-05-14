const WebSocket = require("ws");

const { WSS_BASE_URL = "wss://stream.binance.com:9443/ws" } = process.env;

const candlestickData = async ({
  symbol = "btcusdt",
  interval = "1h",
} = {}) => {
  try {
    const channel = "kline";

    // ex: wss://stream.binance.com:9443/ws/btcusdt@kline_1h
    const URI = `${WSS_BASE_URL}/${symbol}@${channel}_${interval}`;

    const ws = new WebSocket(URI);

    ws.on("message", function incoming(data) {
      console.log(data);
      /* {
        "e": "kline",     // Event type
        "E": 123456789,   // Event time
        "s": "BNBBTC",    // Symbol
        "k": {
          "t": 123400000, // Kline start time
          "T": 123460000, // Kline close time
          "s": "BNBBTC",  // Symbol
          "i": "1m",      // Interval
          "f": 100,       // First trade ID
          "L": 200,       // Last trade ID
          "o": "0.0010",  // Open price
          "c": "0.0020",  // Close price
          "h": "0.0025",  // High price
          "l": "0.0015",  // Low price
          "v": "1000",    // Base asset volume
          "n": 100,       // Number of trades
          "x": false,     // Is this kline closed?
          "q": "1.0000",  // Quote asset volume
          "V": "500",     // Taker buy base asset volume
          "Q": "0.500",   // Taker buy quote asset volume
          "B": "123456"   // Ignore
        }
      } */
      return data;
    });
  } catch (e) {
    throw e;
  }
};

const miniTicker = async ({ symbol = "btcusdt" } = {}) => {
  try {
    const channel = "miniTicker";

    // ex: wss://stream.binance.com:9443/ws/btcusdt@miniTicker
    const URI = `${WSS_BASE_URL}/${symbol}@${channel}`;

    const ws = new WebSocket(URI);

    ws.on("message", function incoming(data) {
      console.log(data);
      /* {
        "e": "24hrMiniTicker",  // Event type
        "E": 123456789,         // Event time
        "s": "BNBBTC",          // Symbol
        "c": "0.0025",          // Close price
        "o": "0.0010",          // Open price
        "h": "0.0025",          // High price
        "l": "0.0010",          // Low price
        "v": "10000",           // Total traded base asset volume
        "q": "18"               // Total traded quote asset volume
      } */
      return data;
    });
  } catch (e) {
    throw e;
  }
};

const allMiniTicker = async ({ symbol = "!miniTicker@arr" } = {}) => {
  try {
    // ex: wss://stream.binance.com:9443/ws/!miniTicker@arr
    const URI = `${WSS_BASE_URL}/${symbol}`;

    const ws = new WebSocket(URI);

    ws.on("message", function incoming(data) {
      console.log(data);
      /* [{
        "e": "24hrMiniTicker",  // Event type
        "E": 123456789,         // Event time
        "s": "BNBBTC",          // Symbol
        "c": "0.0025",          // Close price
        "o": "0.0010",          // Open price
        "h": "0.0025",          // High price
        "l": "0.0010",          // Low price
        "v": "10000",           // Total traded base asset volume
        "q": "18"               // Total traded quote asset volume
      }] */
      return data;
    });
  } catch (e) {
    throw e;
  }
};

module.exports = {
  candlestickData,
  miniTicker,
  allMiniTicker,
};
