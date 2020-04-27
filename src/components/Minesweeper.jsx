import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { create } from 'istanbul-reports'





const Minesweeper = () => {
  const [gameId, setGamieid] = useState([])
  const [gameBoard, setGameBoard] = useState([])
  const [state, setstate] = useState([])
  
  const creatboard = async diff => {
    const resp = await axios
      .post('https://minesweeper-api.herokuapp.com/games', { difficulty: diff }
     )
   
    setGamieid(resp.data.id)
    setGameBoard(resp.data.board)
    setstate(resp.data.state)
  }

  useEffect(() => {
    creatboard()
  }, [])

  const checkCell = async (x, y) => {
    const resp = await axios
          .post(
            `https://minesweeper-api.herokuapp.com/games/${gameId}/check`,
            { row: y, col: x }
          )
            setGameBoard(resp.data.board)
      }

      const flagCell = (x, y) => {}

      const handleLeftClick = (x, y) => {
        checkCell(x, y)
      }
      const handleRightClick = (e, x, y) => {
        e.preventDefault()
        flagCell(x, y)
    
     
  return (
    <main>
    <table className='board'>
      <thead>Minesweaper</thead>
      {gameBoard.map((row, y) => {
        return (
          <tr  key={y}>
            {row.map((col, x) => {
              return (
                <td key={x}
                key={x}
                onClick={() => handleLeftClick(x, y)}
                onContextMenu={e => handleRightClick(e, x, y)}
                >
                
              </td>
              )
            })}
          </tr>
        )
      })}
      <footer className='footer'>{state}</footer>
    </table>
    <section>
        <button
          onClick={() => {
            creatboard(0)
          }}
        >
          EASY
        </button>
        <button
          onClick={() => {
            creatboard(1)
          }}
        >
          MEDIUM
        </button>
        <button
          onClick={() => {
            creatboard(2)
          }}
        >
          HARD
        </button>
      </section>
    </main>
    
  )
}
}
export default Minesweeper
