import React, {useState, useEffect} from "react";
import Die from "./Die";
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

export default function App() {
  
  function allNewDice() {
    const diceRolls = [];
    for (let i = 0; i < 10; i++) {
      const roll = Math.floor(Math.random() * 6) + 1;
      diceRolls.push({
        value: roll, 
        isHeld: false,
        id: nanoid()
      });
    }
    return diceRolls;
  } 

  const [dices, setDices] = useState(allNewDice)

  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    let flag = true
    for (let i = 0; i < 10; i++) {
      if (dices[0].value === dices[i].value && dices[i].isHeld) {
        flag = true
      } else {
        flag = false
        break
      }
    }
    if (flag) {
      setTenzies(true)
      console.log("You won!")
    }
  }, [dices])  

  function handleRoll() {
    const arrOfValues = allNewDice()
    setDices(prevDices => prevDices.map(die => {
      return die.isHeld ? 
        die :
        {...die, value: arrOfValues[dices.indexOf(die)].value}
    }))
  }
  
  function holdDice(id) {
    setDices(prevDices => prevDices.map(die => {
      return die.id === id ? 
        {...die, isHeld: !die.isHeld} : 
        die
    }))
  } 

  function startNewGame() {
    setTenzies(false)
    setDices(allNewDice)
  }


  const dies = dices.map(die => <Die 
    value={die.value}
    isHeld={die.isHeld}
    key={die.id}
    holdDice={() => holdDice(die.id)}
  />)

  return(
    <main>
      {tenzies && <Confetti/>}
      <h1>Tenzies</h1>
      <h2>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h2>
      <div className="dice_component">
        {dies}
      </div>
      <button 
        className="roll_button"
        onClick={tenzies ? startNewGame : handleRoll}
      >
        {tenzies ? "New game" : "Roll"}
      </button>
    </main>
  )
}