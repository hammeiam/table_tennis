import React, { Component, PropTypes } from 'react'

const Game = ({i, winner, loser}) => {
  return (
    <div className='game row'>
      <div className='cell'>Game {i}:</div>
      <div className='cell winner'>{winner.name}</div>
      <div className='cell'>{loser.name}</div>
    </div>
  )
}

Game.propTypes = {}

export default Game