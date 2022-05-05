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
  const idiom_id = req.query.id

  const query = `SELECT * FROM idioms i WHERE id = ${idiom_id}`
  pool
    .query(query)
    .then(data => {

      res.status(200).send(data.rows[0])

    })
    .catch(err => res.status(400).send(err))


})


app.listen(port, () => console.log(`listening at http://localhost:${port}`))

module.exports.app = app;



// postman works get request from port 3003. but axios from front end (2002) does not work. It has an error message, and there's no data.