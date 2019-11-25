import React, { useState, useEffect } from 'react'

import Cell from './components/Cell'



import axios from 'axios'

const App = () => {
  const [gameId, setGamieid] = useState([])
  const [gameBoard, setGameBoard] = useState([])

  const [state, setstate] = useState([])
  const [value, setvalue] = useState([])
  const creatboard = async () => {
    const resp = await axios
      .post('https://minesweeper-api.herokuapp.com/games', { difficulty: 0 })
      .then()
    const data = resp.data
    console.log(data)
    setGamieid(data.id)
    setGameBoard(data.board)

    setstate(data.state)
    setvalue(data.value)
  }

  useEffect(() => {
    creatboard()
  }, [])

  return (
    <table className='board'>
      <thead>Minesweaper</thead>
      {gameBoard.map((entry, column) => {
        return (
          <tr>
            {entry.map((ar, row) => {
              return (
                <Cell
                  gameId={gameId}
                  row={column}
                  column={row}
                  state={state}
                  value={ar}
                  setGameBoard={setGameBoard}
                  setstate={setstate}
                />
              )
            })}
          </tr>
        )
      })}
      <footer className='footer'>{state}</footer>
    </table>
  )
}

export default App
