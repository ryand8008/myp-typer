import React, { useState, useEffect, useRef } from 'react';
import Highlight from './Highlight.jsx';
import styled from 'styled-components';

// a word is averaged to 5 keystrokes
// (total chars/ 5)/ finishedTime

// const exampleText = 'This is just a test' //19
const exampleText = `Barking Up The Wrong Tree Meaning: To make a wrong assumption about something.`
function App() {
  const [text, setText] = useState('');
  const [wpm, setWpm] = useState(0);
  const [timer, setTimer] = useState(0);
  const [finishedTime, setFinishedTime] = useState(null);
  const [start, setStart] = useState(false);
  const [accuracy, setAccuracy] = useState(0)
  const countRef = useRef(null);

  const textLen = Math.round(exampleText.length / 5);
  const textLength = exampleText.split('').length - 1;

  const time = finishedTime /60
  const rawWpm = Math.floor((wpm/5)/time)



  const splitText = exampleText.split('')
// create timer + wpm by taking the amount of chars in 'example text'
// create accuracy by amount of chars / keystroke count

const finished = (text === exampleText)
useEffect(() => {
  if (finished) {
    setStart(false)
    setFinishedTime(timer)
    clearInterval(countRef.current)

  }
}, [finished])

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
  setAccuracy(() => (textLength/wpm) * 100)

}

const resetCounter = (e) => {
  e.preventDefault();
  setKeyPress(0);
  setStart(false);
  setTimer(() => 0);
  clearInterval(countRef.current);
}

const submitHandler = (e) => {
  e.preventDefault()
  e.stopPropagation();
  setStart(false)
}


  return (
    <>
    <h1> hello World</h1>
    <Textbox>Type this: <Highlight
    text={exampleText} highlight={text} /></Textbox>
    <Textbox>Input: {text} </Textbox>
    <div>{finished ? `Completed in ${finishedTime} seconds` : `${timer} seconds have elapsed`}</div>
    <div> Keystrokes => {wpm}  Perfect keystroke count: {exampleText.length}</div>
    <div> {finishedTime ? rawWpm : 0} wpm</div>
    <div>accuracy: {Math.floor(accuracy)}%</div>
    <div>errors: {finishedTime ? wpm-exampleText.length : 0}</div>
    <button onClick={() => setWpm(0)} >Reset Counter</button>
    <form>
      <label>
        <input type="text" name="typer" onChange={(e) => handleTyping(e)} placeholder="start typing..." />
      </label>

    </form>
    </>
  )
}

const Typetext = styled.div`
  // text-color: ${props => props.color ? 'black' : 'red'}
  font-style: italic;
`
const Textbox = styled.div`
  border: 1px solid black;
  width: fit-content;
  padding-left: 10px;
  padding-right: 10px;
`
export default App;