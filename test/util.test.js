const { createSignature } = require("../src/lib/util.js");

// https://github.com/binance/binance-spot-api-docs/blob/master/rest-api.md#signed-endpoint-examples-for-post-apiv3order

test("It can create a correct signature to work with Binance API", () => {
  const secret =
    "NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j";
  const string =
    "symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC&quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559";
  expect(createSignature(string, secret)).toBe(
    "c8db56825ae71d6d79447849e617115f4a920fa2acdcab2b053c4b2838bd6b71"
  );
});
