import React, { useState, useRef, useEffect } from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import Cell from './components/Cell'
import $ from 'jquery'
import axios from 'axios'

const App = props => {
  const [gameId, setGamieid] = useState([])
  const [gameBoard, setGameBoard] = useState([])
  const [state, setstate] = useState([])
  const [value, setvalue] = useState([])

  const creatboard = async diff => {
    const resp = await axios
      .post('https://minesweeper-api.herokuapp.com/games', { difficulty: diff })
      .then()
    const data = resp.data
    console.log(data)
    setGamieid(data.id)
    setGameBoard(data.board)
    console.log('i am here ' + data.state)
    setstate(data.state)
    setvalue(data.value)

    if (data.state == 'new') {
      //  interval = true
      //   gamePlaying = true
      let timer = 0
      document.getElementById('counter').innerHTML = timer
      document.getElementById('Sad').style.display = 'none'
      document.getElementById('Smiley').style.display = 'inline-flex'
    }
  }

  
 
  const newgame = () => {
    creatboard(0)
  }

  useEffect(() => {
    creatboard()
  }, [])

  return (
    <body>
      <header>Minesweeper!!</header>

      <section className='Button-Container'>
        <button
          id='diffic-0'
          className='difficulty'
          onClick={() => {
            creatboard(0)
          }}
        >
          EASY
        </button>
        <button
          id='diffic-1'
          className='difficulty'
          onClick={() => {
            creatboard(1)
          }}
        >
          MEDIUM
        </button>
        <button
          className='difficulty'
          id='diffic-2'
          onClick={() => {
            creatboard(2)
          }}
        >
          HARD
        </button>
      </section>
      <div className='Game-Container'>
        <section className='Top-Con'>
          <section className='Inner-Top-Container'>
            <section></section>
            <button
              onClick={() => {
                creatboard(0)
              }}
              className='Smiley-Container'
              id='Smiley'
            >
              😀
            </button>
            <button
              onClick={() => {
                creatboard(0)
              }}
              className='Smiley-Container'
              id='Sad'
            >
              😫
            </button>
            <section id='counter' className='count'></section>
          </section>
        </section>
        <table className='board'>
          <tbody>
            {gameBoard.map((entry, column) => {
              return (
                <tr className='box'>
                  {entry.map((ar, row) => {
                    return (
                      <td>
                        <Cell
                          gameId={gameId}
                          row={column}
                          column={row}
                          state={state}
                          value={ar}
                          setGameBoard={setGameBoard}
                          setstate={setstate}
                        />
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <footer className='footer'>{state}</footer>
    </body>
  )
}
export default App
