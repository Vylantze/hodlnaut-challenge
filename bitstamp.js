import https from "https"

const baseURL = "https://www.bitstamp.net/api/v2";

export default {
  getHourlyBtcUsd: () => {
    return new Promise((resolve, reject) => {
      let req = https.get(`${baseURL}/ticker_hour/btcusd/`, res => {
        res.on('data', d => {
          try {
            let json = JSON.parse(d);
            resolve(Number(json.last));
          } catch (e) {
            reject(e);
          }
        });
      });
      req.on('error', e => reject(e));
      req.end();
    });
  },
  getHourlyEthUsd: () => {
    return new Promise((resolve, reject) => {
      let req = https.get(`${baseURL}/ticker_hour/ethusd/`, res => {
        res.on('data', d => {
          try {
            let json = JSON.parse(d);
            resolve(Number(json.last));
          } catch (e) {
            reject(e);
          }
        });
      });
      req.on('error', e => reject(e));
      req.end();
    });
  },
};