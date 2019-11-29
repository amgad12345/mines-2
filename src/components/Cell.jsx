import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Cell = props => {
const [cell, checkCell] = useState([])
const [state, checkstate] = useState([])

const checkCellEvent = async () => {
const resp = await axios
      .post(
        `https://minesweeper-api.herokuapp.com/games/${props.gameId}/check`,
        { id: props.gameId, row: props.row, col: props.column }
      )
      .then()
  const data = resp.data
    console.log(data)
    props.setGameBoard(data.board)
    checkstate(data.state)

    console.log(data.state)

    props.setstate(data.state)
  }

  const [flag, flagCell] = useState([])
  const flagCellEvent = async () => {
  const resp = await axios
      .post(
        `https://minesweeper-api.herokuapp.com/games/${props.gameId}/flag`,
        { id: props.gameId, row: props.row, col: props.column }
      )
      .then()
  const data = resp.data
    console.log(data)
    props.setGameBoard(data.board)
    flagCell(data.value)
  }
  const setSymbol = value => {
  const symbols = {
      _: '◻️',
      F: '🚩',
      '@': '🏳',
      '*': '💥' 
    }

  let symbol = symbols[value] || value

    return symbol
  }

  useEffect(() => {
    flagCell()
  }, [])
  useEffect(() => {
    checkCell()
  }, [])

  return (
    <button
      className='button'
      onClick={checkCellEvent}
      onContextMenu={event => {
        event.preventDefault()
        flagCellEvent()
      }}
    >
      <td>{setSymbol(props.value)}</td>
    </button>
  )
}

export default Cell
