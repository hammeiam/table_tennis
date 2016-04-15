import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'


const LeaderboardView = ({playersData, sortedPlayers}) => {
  const headers = (
    <div className={'leaderboard-row header'}>
      <div className='cell'></div>
      <div className='cell'></div>
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
        <div className='cell'><Link to={`/players/${player.id}`}>{player.name}</Link></div>
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

LeaderboardView.propTypes = {
  playersData: PropTypes.object,
  sortedPlayers: PropTypes.arrayOf(PropTypes.number).isRequired
}

const mapStateToProps = (state) => {
  const { appReducer } = state
  const { players } = appReducer
  return {
    playersData: players.data,
    sortedPlayers: players.sorted
  }
}

const Leaderboard = connect(
  mapStateToProps,
  null
)(LeaderboardView)

export default Leaderboard