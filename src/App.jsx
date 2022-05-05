import React, { useState, useEffect, useRef } from 'react';
import Highlight from './Highlight.jsx';
import styled from 'styled-components';
import { idiomList1 } from '../idioms/idiomList1.js'
import axios from 'axios';




// a word is averaged to 5 keystrokes
// (total chars/ 5)/ finishedTime


function App() {

  // idiom
  const [idiomNum, setIdiomNum] = useState(63);
  const title = idiomList1[idiomNum].title;
  const definition = idiomList1[idiomNum].meaning;
  const exampleIdiom = idiomList1[idiomNum].examples[0];

  const [text, setText] = useState('');
  const [wpm, setWpm] = useState(0);
  const [timer, setTimer] = useState(0);
  const [finishedTime, setFinishedTime] = useState(null);
  const [start, setStart] = useState(false);
  const [accuracy, setAccuracy] = useState(0)
  const [typeThis, setTypeThis] = useState(definition)
  const countRef = useRef(null);


  const finished = (text === typeThis)
  //calculate average word => keystroke divded by 5
  const textLen = Math.round(typeThis.length / 5);
  const typeThisLen = typeThis.length -1;
  const time = finishedTime /60
  const rawWpm = Math.floor((wpm/5)/time)

useEffect(() => {
  if (finished) {
    setStart(false)
    setFinishedTime(timer)
    setText('')
    clearInterval(countRef.current)
    // setTypeThis(definition)
  }
  if (typeThis !== definition)
    setTypeThis(exampleIdiom)

}, [finished, typeThis, idiomNum])

const handleTyping = (e) => {
  e.preventDefault();

  if (!start && !finished) {
  setStart(true)
  countRef.current = setInterval(() => {
    setTimer((timer) => timer + 1)
  }, 1000)
}
  setText(e.target.value)
  setWpm(wpm => wpm + 1)
  setAccuracy(() => (typeThisLen/wpm) * 100)

}

const resetButton = (e) => {
  e.preventDefault();
  setWpm(0);
  setAccuracy(0);
  setStart(0);
  setTimer(0);
  setFinishedTime(0);
  setText('');
  clearInterval(countRef.current);
}

const newIdiom = (e) => {
  e.preventDefault();
  let newNumber = Math.floor(Math.random() * 80)
  setIdiomNum(newNumber)

  setTypeThis(definition)
  setText('');
  setWpm(0);
  setAccuracy(0);
  setStart(0);
  setTimer(0);
  setFinishedTime(0);

}

const handleExample = (e) => {
  if (definition === typeThis) {
    setTypeThis(() => exampleIdiom)
  } else {
    setTypeThis(() => definition)
  }
  setText('');
  setWpm(0);
  setAccuracy(0);
  setStart(0);
  setTimer(0);
  setFinishedTime(0);
  clearInterval(countRef.current);
}

const saveScore = (e) => {
  e.preventDefault();
  // save in db
  // display on page under <website> box;
    let stats = {
      'title': title,
      'definition': definition,
      'wpm': wpm,
      'accuracy': Math.floor(accuracy)
    }
    console.log(title)

    axios.get(`http://localhost:3003`, {
      params: {
        'id': idiomNum
      }
    })
    .then(({ data }) => {
      console.log(data, 'this is data')
    })
    .catch(err => console.log(err))


  console.log(stats, 'this is stats')
  console.log('keystrokes: ', wpm, 'accuracy: ', accuracy )
}


  return (

    <Website>
    <Containerbox>
      <h1>What is an idiom? </h1>
      <h3>An idiom is a group of words whose meaning is different from the meanings of the individual words</h3>
      <h4>To play the game:</h4>
        <li>Type either the definition of the idiom or and example of the idiom </li>
        <li>And see how fast and accurate you can type it!</li>
        <li>You must type it exactly or it will not be counted as complete</li>
        <li>The sentence will stay yellow as you type it correctly</li>

    <p />
    <p />
      <TextIdiom>Idiom: {title} </TextIdiom>
      <Textbox>{typeThis === definition ? `Definition: `  : `Example: `} <Highlight
      text={typeThis} highlight={text} /> </Textbox>
      <Textbox>Input: {finishedTime ? 'Complete!' : text}
      <div> {finishedTime ? rawWpm : 0} wpm</div>
      </Textbox>

      <InputField>
        <label>
          <RealInput type="text" name="typer" value={text} autoComplete="off" onChange={(e) => handleTyping(e)} placeholder="timer starts when you start typing..." />
        </label>
        <Button onClick={(e) => resetButton(e)} >Reset</Button>
      </InputField>
      <Button onClick={(e) => handleExample(e)}>{typeThis === definition ? 'example' : 'definition'}</Button>
      <Button onClick={(e) => newIdiom(e)}>new idiom</Button>
    <div>{finishedTime ? `Completed in ${finishedTime} seconds` : `${timer} seconds have elapsed`}</div>
    <div> Keystrokes => {wpm} | Perfect keystroke count: {typeThis.length}</div>
    <div>accuracy: {Math.floor(accuracy)}%</div>
    <div>errors: {finishedTime ? wpm-typeThis.length : 0}</div>
    <Scorebutton onClick={(e) => saveScore(e)}>Submit Scores</Scorebutton>
    </Containerbox>
    </Website>


  )
}

const Typetext = styled.div`
  // text-color: ${props => props.color ? 'black' : 'red'}
  font-style: italic;
  padding: 10px, 10px, 10px, 10px;
`

const Textbox = styled.div`
// border: 1px solid black;
border-radius: 5px;
height: 30px;
position: center;
width: fit-content;
margin: 15px, 15px, 15px, 0px;
padding: 10px;
`;

const TextIdiom = styled(Textbox)`
  // border: 1px solid black;
  border-radius: 5px;
  height: 30px;
  position: center;
  width: fit-content;
  margin: 15px, 15px, 15px, 0px;
  padding: 10px;
  font-weight: bold;
`

const Containerbox = styled.div`
  border: 2px solid black;
  padding: 20px;
  width: 850px;
  border-radius: 5px;
  margin: 0 auto;
`;

const InputField = styled.form`
  // border: 1px solid black;
  padding: 12px, 20px;
  width: fit-content;
  // box-sizing: border-box;
`

const RealInput = styled.input`
  width: 600px;
  height: 30px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 3px #ddd;
  border-radius: 4px;
`

const Website = styled.div`
  // display: flex;
  position: center;
  top: 50%;
  justify-content: center;
  align-items: center;
  position: center;
  background: '#FAF9F6';
`

const Completed = styled.div`
  text-color: green;
`

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
`;

const Scorebutton = styled(Button)`
  position: relative;
  left: 650px;
`;

// const Wholepage = styled.body`
//   background-color: #918f8a;
// `
export default App;