import React, { useState, useEffect, useRef } from 'react';
import Highlight from './Highlight.jsx';
import styled from 'styled-components';
import { idiomList1 } from '../idioms/idiomList1.js'

// a word is averaged to 5 keystrokes
// (total chars/ 5)/ finishedTime

// const exampleText = 'This is just a test' //19
// const exampleText = `Barking Up The Wrong Tree Meaning: To make a wrong assumption about something.`

function App() {

  // idiom
  const [idiomNum, setIdiomNum] = useState(5);
  const title = idiomList1[idiomNum].title;
  const definition = idiomList1[idiomNum].meaning;
  const exampleIdiom = idiomList1[idiomNum].examples[0];

  console.log(idiomNum, title)
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


  return (
    <>
    <Website>
    <Containerbox>
    <h1>What is an idiom? </h1>
    <h2>An idiom is a group of words whose meaning is different from the meanings of the individual words -Oxford Dictionary</h2>

      <Textbox>Idiom: {title} </Textbox>
      <Textbox>{typeThis === definition ? `Definition: `  : `Example: `} <Highlight
      text={typeThis} highlight={text} /> </Textbox>
      <Textbox>Input: {finishedTime ? 'Complete!' : text}
      <div> {finishedTime ? rawWpm : 0} wpm</div>
      </Textbox>

      <InputField>
        <label>
          <RealInput type="text" name="typer" value={text} autoComplete="off" onChange={(e) => handleTyping(e)} placeholder="timer starts when you start typing..." />
        </label>

      </InputField>
    <button onClick={(e) => resetButton(e)} >Reset</button><button onClick={(e) => handleExample(e)}>{typeThis === definition ? 'example' : 'definition'}</button><button onClick={(e) => newIdiom(e)}>new idiom</button>
    <div>{finishedTime ? `Completed in ${finishedTime} seconds` : `${timer} seconds have elapsed`}</div>
    <div> Keystrokes => {wpm}  Perfect keystroke count: {typeThis.length}</div>
    <div>accuracy: {Math.floor(accuracy)}%</div>
    <div>errors: {finishedTime ? wpm-typeThis.length : 0}</div>
    </Containerbox>
    </Website>
    </>
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

`

const Containerbox = styled.div`
  border: 2px solid black;
  padding: 20px;
  width: 800px;
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
`
export default App;