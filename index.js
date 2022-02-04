import express from 'express';
import expressAsync from 'express-async-handler'
import bitstamp from './bitstamp.js';
import userBalances from './db.js';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/user/:userId', expressAsync(async (req, res) => {
  let userId = req.params.userId;
  let userData = userBalances[req.params.userId];
  if (!userId || !userData) {
    res.status(401).send({ error: "User not found in database" });
    return;
  }

  let balance = 0;
  if (userData.BTC) {
    let btcRate = await bitstamp.getHourlyBtcUsd();
    balance += btcRate * Number(userData.BTC);
  }
  if (userData.ETH) {
    let ethRate = await bitstamp.getHourlyEthUsd();
    balance += ethRate * Number(userData.ETH);
  }

  balance = balance.toFixed(2);

  res.send({ balance });
}));

let server = app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})

export default server;