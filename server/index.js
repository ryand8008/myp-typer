require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios')
// import { writeFileSync, readFileSync } from 'fs';
const port = process.env.PORT || 3003;
const app = express();


app.use(express.static(path.join(__dirname, 'public')));
const pool = require('./db.js')

app.use(express.json());

app.get('/', (req, res) => {
  const idiom = req.query.idiom
  console.log(req.body, 'body')
  console.log(req, 'this is full req')

  const query = `SELECT * FROM idioms WHERE idiom = ${idiom}`
  pool
    .query(query)
    .then(data => {
      console.log(data.rows[0])
      res.status(200).send(data.rows[0])

    })
  console.log(req.query)

})


app.listen(port, () => console.log(`listening at http://localhost:${port}`))

module.exports.app = app;