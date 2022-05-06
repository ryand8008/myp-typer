import react, { useState, useEffect } from 'react';
import axios from 'axios';


function Scoreboard ({ idiom_id, table, idiom }) {
  const [information, setInformation] = useState([idiom]);
console.log(table, 'this is table')
  useEffect(() => {
    let query;
  if (!table) {
     query = `SELECT * FROM scores_def s WHERE idiom_id = ${idiom_id} ORDER BY wpm desc LIMIT 5;`
  } else {
     query = `SELECT * FROM scores_ex WHERE idiom_id = ${idiom_id} ORDER BY wpm desc  LIMIT 5;`
  }


  axios.get(`http://localhost:3003`, {
    params: {
      'query': query
    }
  })
    .then(({ data }) => {
      let idioms = [];
      data.map((item) => idioms.push(item))
      setInformation(idioms)

    })
    .catch(err => console.log(err))
  }, [idiom_id, table])

  return (
    <>
    <div>Scores for {table}</div>
    {information ? information.map( (item, i) => <div key={i}>wpm: {item.wpm} | accuracy: {item.accuracy} | time: {item.time} seconds</div>) : null}

    </>
  )
}

export default Scoreboard;
