import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'


const Leaderboard = ({playersData, sortedPlayers}) => {
  const headers = (
    <div className={'leaderboard-row header'}>
      <div className='cell'></div>
      <div className='cell name'></div>
      <div className='cell'>Rating</div>
      <div className='cell'>Won</div>
      <div className='cell'>Lost</div>
    </div>
  )

  const rows = sortedPlayers.map((playerId,i) => {
    const player = playersData[playerId]
    const won = player.won_games.length
    const rowClass = i % 2 === 0 ? 'even' : 'odd'
    return (
      <div className={`leaderboard-row ${rowClass}`} key={i}>
        <div className='cell'>{i + 1}.</div>
        <div className='cell name'><Link to={`/${player.name}`}>{player.name}</Link></div>
        <div className='cell'>{player.rating}</div>
        <div className='cell'>{player.won_games.length}</div>
        <div className='cell'>{player.lost_games.length}</div>
      </div>
    )
  })
  return (
    <div className='leaderboard'>
      <h2>Leaderboard</h2>
      
      <div className='leaderboard-table'>
        {headers}
        {rows}
      </div>
    </div>
  )
}

Leaderboard.propTypes = {}

export default Leaderboard