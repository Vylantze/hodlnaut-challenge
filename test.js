import chai from "chai";
import chaiHttp from "chai-http";
import app from './index.js';

const { expect } = chai;
chai.use(chaiHttp);

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

  it("Hello World", async () => {
    chai.request(app).get("/").end((err, res) => {
      expect(err).to.equal(null);
      expect(res.status).to.equal(200);
      expect(res.text).to.equal("Hello World!");
    });
  });
});
