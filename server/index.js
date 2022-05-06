require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios')
const port = process.env.PORT || 3003;
const app = express();
const cors = require('cors');
app.use(cors());


app.use(express.static(path.join(__dirname, 'public')));
const pool = require('./db.js')

app.use(express.json());

app.get('/', (req, res) => {

  const getScores = req.query.query


  pool
    .query(getScores)
    .then((data) => {
      res.status(200).send(data.rows)

    })
    .catch(err => res.status(400).send(err))
})

app.post('/', (req, res) => {
  console.log(req.body, 'this is body')
  let idiom_id = req.body.idiom_id;
  let definition = req.body.definition;
  let example = req.body.example;
  let wpm = req.body.wpm;
  let keystrokes = req.body.keystrokes;
  let time = req.body.time;
  let accuracy = req.body.accuracy;
  let table = '';


  if (definition) {
    table = 'scores_def'
  } else {
    table = 'scores_ex'
  }

  const query = `
  INSERT INTO ${table}(idiom_id,wpm,accuracy,time,keystrokes)
  VALUES (${idiom_id}, ${wpm}, ${accuracy}, ${time}, ${keystrokes})`

  pool
    .query(query)
    .then(() => {
      res.status(200).send('score saved!')
    })
    .catch(err => console.log(err))

})


app.listen(port, () => console.log(`listening at http://localhost:${port}`))

module.exports.app = app;



// postman works get request from port 3003. but axios from front end (2002) does not work. It has an error message, and there's no data.