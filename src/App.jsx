import React, { useState, useEffect, useRef } from 'react';
import Highlight from './Highlight.jsx';
import styled from 'styled-components';
import { idiomList1 } from '../idioms/idiomList1.js'

// a word is averaged to 5 keystrokes
// (total chars/ 5)/ finishedTime

// const exampleText = 'This is just a test' //19
const exampleText = `Barking Up The Wrong Tree Meaning: To make a wrong assumption about something.`
function App() {
  // idiom
  const title = idiomList1['1'].title;
  const definition = idiomList1['1'].meaning;
  const exampleIdiom = idiomList1['1'].examples[0];

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

// create timer + wpm by taking the amount of chars in 'example text'
// create accuracy by amount of chars / keystroke count

useEffect(() => {
  if (finished) {
    setStart(false)
    setFinishedTime(timer)
    setText('')
    clearInterval(countRef.current)

  }
}, [finished, typeThis])

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

const reset = (e) => {
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
  // change the [#] to random
  // rerender definition
}

const handleExample = (e) => {
  setText('');
  setTypeThis(exampleIdiom)
  setWpm(0);
  setAccuracy(0);
  setStart(0);
  setTimer(0);
  setFinishedTime(0);
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
    <h2>What is an idiom? </h2>
    <h3>An idiom is a group of words whose meaning is different from the meanings of the individual words -Oxford Dictionary</h3>
    <Container>

      <Textbox>Idiom: {title} </Textbox>
      <Textbox>{typeThis === definition ? 'Definition: ' : 'Example: '} <Highlight
      text={typeThis} highlight={text} /> </Textbox>
      <Textbox>Input: {text}
      <div> {finishedTime ? rawWpm : 0} wpm</div>
      </Textbox>

      <form>
        <label>
          <input type="text" name="typer" onChange={(e) => handleTyping(e)} placeholder="start typing..." />
        </label>

      </form>
    </Container>
    <button onClick={(e) => reset(e)} >Reset</button><button onClick={(e) => handleExample(e)}>example</button><button>new idiom</button>
    <div>{finished ? `Completed in ${finishedTime} seconds` : `${timer} seconds have elapsed`}</div>
    <div> Keystrokes => {wpm}  Perfect keystroke count: {typeThis.length}</div>
    <div>accuracy: {Math.floor(accuracy)}%</div>
    <div>errors: {finishedTime ? wpm-typeThis.length : 0}</div>
    </>
  )
}

const Typetext = styled.div`
  // text-color: ${props => props.color ? 'black' : 'red'}
  font-style: italic;
  padding: 10px, 10px, 10px, 10px;
`
const Textbox = styled.div`
  // border: 1px solid red;
  position: center;
  width: fit-content;
  padding-left: 10px;
  padding-right: 10px;
`

const Container = styled.div`
  border: 1px, solid, black;
  padding: 20px;
`;
export default App;