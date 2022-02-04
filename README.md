[![CI](https://github.com/Vylantze/user-crypto-balance/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/Vylantze/user-crypto-balance/actions/workflows/gh-pages.yml)

# Hodlnaut Coding Challenge

Thanks for taking the time to do our coding test!

__The reason we are using replit is so you don't have to go through the trouble of setting up a node.js environment. If you'd prefer to develop locally and upload your code to a git repo then feel free to do this and share the link.__

On the Hodlnaut website, users can have balances in various cryptocurrency assets including BTC and ETH. Users also want to view their total balance in another asset such as USD. To be able to do this, we need to fetch prices for pairs such as BTC/USD and ETH/USD to convert between assets.

To give an example, let’s say the user’s balance is 0.5 BTC and 2 ETH. If the current BTC/USD price is 60000 and the ETH/USD price is 3000, then the user’s total balance in USD would be 60000 \* 0.5 + 3000 \* 2 = 36000 USD.

### Submission
Please fork the repl.it, and share the link with us. You can add the answers to the question directly in the document.

----

## Task

Create __one API endpoint using Node and Express that takes in a user id and returns the user's total balance in USD__.

Keep the user’s balances stored in memory. An example of the data to be stored is provided at the end of this section. Feel free to add more entries or change the way the data is stored if you want, but this is not necessary.

You will need to fetch the current prices from a third party public API. You can use the price from any cryptocurrency exchange but it is recommended that you use Bitstamp.

Here is a link to their API docs: https://www.bitstamp.net/api/#ticker

Assume that the only assets that the user’s balance can contain are __BTC and ETH__.

Ensure the API endpoint works correctly by writing at least one test case using the __Mocha and Chai__ frameworks.

There is a test scaffold  `test.js` that you can use and `package.json` has been changed so that `npm run test` will run the unit tests.

It’s expected that this task should take less than 2-3 hours to complete. If you find yourself spending too much time on this task, then just give a short explanation about what aspects were particularly time consuming and what steps you would’ve done in order to complete the task.

Aim to write clear and concise code.

```
const userBalances = {
  "user-1": {
    "BTC": "0.5",
    "ETH": "2"
  },
  "user-2": {
    "BTC": "0.1",
  },
  "user-3": {
    "ETH": "5",
  },
}
```

## Questions
__1. (Optional) If you didn’t have time to complete your intended design, what else would you have done?__
> NIL

__2. Which took the most time? What did you find most difficult?__
> Trying to debug why express did not allow for async functions took surprising amount of time. I found it most difficult to choose which of the parameters and apis to use for the conversion, since I had no experience in cryptocurrency. But, once I figured it out, it was so simple that I wonder why I took so long. I also took a surprisingly long time to set up the CI that I intended to have running.

__3. If we wanted the balance to update on the frontend more often (10 times per second), how would you improve the current system to handle this?__
> I believe that the api is simple enough to be able to be called 10 times per second with no issue. However, I would need to update the api to instead fetch the current tick for the balance instead of the hourly tick. The hourly tick is used now to ensure that the automated tests won't have false negatives as much as possible. 

__4. How did you find the test overall? If you have any suggestions on how we can improve the test, we'd love to hear them!__
> I think the test is simple and effective enough. I think the exact api call to use from bitstamp as well as which parameters are preferred (I used the latest conversion rates and the hourly api).
