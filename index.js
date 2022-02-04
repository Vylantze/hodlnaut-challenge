import express from 'express';
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/user/:userId', (req, res) => {
  if (!req.params && !req.userId) {
    throw new Error("No userId provided found")
  }
  res.send('Hello World!')
})

let server = app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})

export default server;