import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
let gamePlaying = false
let interval = null

const Cell = props => {
  const [cell, checkCell] = useState([])
  const [state, checkstate] = useState([])
  const [value, setvalue] = useState([])

  const checkCellEvent = async () => {
    console.log('remaking game ')
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
    setvalue(data.value)
    console.log(data.board.value)
    props.setstate(data.state)
    // var t = document.getElementById("table"), // This have to be the ID of your table, not the tag
    //  d = t.getElementsByTagName("tr")[0],
    // r = d.getElementsByTagName("td")[0];
    // console.log(r)

    let timer = 0

    console.log(data.state)

    const startTimer = () => {
      console.log(interval)
      if (!interval) {
        interval = setInterval(() => {
          timer++

          // all three of these lines do the same thing
          // timer++
          // timer += 1
          // timer = timer + 1
         // console.log('heart beat', timer)
          //   let seconds = timer
          document.getElementById('counter').innerHTML = timer
        }, 1000)
      }
    }

    const stopTimer = () => {
      timer = 0
      console.log(interval)
      clearInterval(interval)
      console.log(interval)
      interval = null
      console.log('trying to stop timer')
      document.getElementById('Smiley').style.display = 'none'
      document.getElementById('Sad').style.display = 'inline-flex'
    }

    if (data.state == 'playing' && !gamePlaying) {
      console.log('in playing ' + data.state)

      document.getElementById('diffic-0').disabled = 'true'
      document.getElementById('diffic-1').disabled = 'true'
      document.getElementById('diffic-2').disabled = 'true'
      document.getElementById('Smiley').disabled = 'true'
      console.log(timer)
      startTimer()
    } else {
      stopTimer(interval)
      interval = null
      gamePlaying = false
      console.log(data.state)
      console.log('in losing and trying to stop timer ')
    }

    if (data.state == 'lost') {
      document.getElementById('diffic-0').disabled = false
      document.getElementById('diffic-1').disabled = false
      document.getElementById('diffic-2').disabled = false
      document.getElementById('Smiley').disabled = false
    }

    function change() {
      var text = document.getElementById('cell')

      console.log()
      if (text) {
        document.getElementById('cell').style.Color = 'green'
      }
    }
    console.log('changing color')
    change()
  }
  //ref = {c => props.myDiv = c}
  //   gamePlaying = true

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
      <td id='cell' className='k' data-color='19'>
   
        {setSymbol(props.value)}
      </td>
    </button>
  )
}

export default Cell
