import chai from "chai";
import chaiHttp from "chai-http";
import app from './index.js';
import bitstamp from './bitstamp.js';
import userBalances from './db.js';

const { expect } = chai;
chai.use(chaiHttp);

console.log("Get rates from bitstamp...");
const btcRate = await bitstamp.getHourlyBtcUsd();
const ethRate = await bitstamp.getHourlyEthUsd();
console.log(`btc-usd: ${btcRate}, eth-usd: ${ethRate}`);

describe("Test", () => {
  it("Basic Test", async () => {
    expect(1).to.equal(1);
  });
});

describe("Test app", () => {
  after(() => {
    try {
      app.close();
    } catch (e) {
      console.log("Encountered error while closing.", e);
    }
  });

  const getBalance = userId => {
    let currentUser = userBalances[userId];
    if (!currentUser) return 0;
    let btc = currentUser.BTC ? Number(currentUser.BTC) * btcRate : 0;
    let eth = currentUser.ETH ? Number(currentUser.ETH) * ethRate : 0;
    let value = (btc + eth).toFixed(2);
    return value;
  };

  it("Hello World", async () => {
    chai.request(app).get("/").end((err, res) => {
      expect(err).to.equal(null);
      expect(res.status).to.equal(200);
      expect(res.text).to.equal("Hello World!");
    });
  });

  it("Get Invalid User 1", async () => {
    var userId = "";
    chai.request(app).get(`/user/${userId}`).end((err, res) => {
      expect(err).to.equal(null);
      expect(res.status).to.equal(404);
    });
  });

  it("Get Invalid User 2", async () => {
    var userId = "0";
    chai.request(app).get(`/user/${userId}`).end((err, res) => {
      expect(err).to.equal(null);
      expect(res.status).to.equal(401);
      expect(Boolean(res.text)).to.equal(true);
      let json = JSON.parse(res.text);
      expect(json.error).to.equal("User not found in database");
    });
  });


  const testValidUser = (userId, balance) => {
    chai.request(app).get(`/user/${userId}`).end((err, res) => {
      expect(err).to.equal(null);
      expect(res.status).to.equal(200);
      expect(Boolean(res.text)).to.equal(true);
      let json = JSON.parse(res.text);
      expect(Number(json.balance).toFixed(2)).to.equal(balance);
    });
  };

  it("Get Valid User 1", async () => {
    var userId = "user-1";
    var balance = getBalance(userId);
    testValidUser(userId, balance);
  });

  it("Get Valid User 2", async () => {
    var userId = "user-2";
    var balance = getBalance(userId);
    testValidUser(userId, balance);
  });

  it("Get Valid User 3", async () => {
    var userId = "user-3";
    var balance = getBalance(userId);
    testValidUser(userId, balance);
  });
});
