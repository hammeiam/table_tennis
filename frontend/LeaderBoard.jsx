import React, { Component, PropTypes } from 'react'

const Leaderboard = ({players, sortedPlayers}) => {
  return (
    <div className='leaderboard'>
      <h1>Leaderboard</h1>
        {sortedPlayers.map((playerId,i) => {
          const player = players[playerId]
          const won = player.won_games.length
          return (
            <div className='player' key={i}>
              <span>{i + 1}.</span>
              {' '}
              <span>Name: {player.name}</span>
              {' '}
              <span>Won: {player.won_games.length}</span>
              {' '}
              <span>Lost: {player.lost_games.length}</span>
            </div>
            )
          })
        }
    </div>
  )
}

Leaderboard.propTypes = {}

export default Leaderboard