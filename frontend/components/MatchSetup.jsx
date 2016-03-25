import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { selectMatchPlayer } from '../actions'

// TODO: better way to do select default option & DRY
// TODO: wrap in form, make default id '', make default option required
const MatchSetupView = (props) => {
  const { 
    waitingOnServer, 
    playersData, 
    firstPlayerId, 
    secondPlayerId,
    games,
    selectPlayer
  } = props
  const bothPlayersChosen = firstPlayerId !== -1 && secondPlayerId !== -1
  const selectOption = {
    id: -1,
    name: 'Select Player'
  }
  const playerOptions = [selectOption].concat(Object.keys(playersData)
    .map(playerId => {
      return playersData[playerId]
    })
  )

  return (
    <main className='row'>
      <section className='col-100'>
        <h2>Choose Players</h2>
        <div className='row'>
          <div className='col-40'>
            <div className='even-space lg'>
              <select 
                id='selectFirstPlayer'
                value={firstPlayerId}
                onChange={(e) => selectPlayer('firstPlayerId', e)}
                >
                {playerOptions.filter(player => {
                  if(secondPlayerId === -1){ return true }
                  return player.id !== secondPlayerId
                }).map((player,i) => {
                  return <option 
                    key={player.id} 
                    className={i === 0 ? 'disabled' : ''} 
                    value={player.id}>
                      {player.name}
                  </option>
                })}
              </select>
            </div>
          </div>

          <div className='col-20'>
            <div className='even-space lg'>
              <h2>vs.</h2>
            </div>
          </div>

          <div className='col-40'>
            <div className='even-space lg'>
              <select 
                id='selectSecondPlayer'
                value={secondPlayerId}
                onChange={(e) => selectPlayer('secondPlayerId', e)}
                >
                {playerOptions.filter(player => {
                  if(firstPlayerId === -1){ return true }
                  return player.id !== firstPlayerId
                }).map((player,i) => {
                  return <option 
                    key={player.id} 
                    className={i === 0 ? 'disabled' : ''} 
                    value={player.id}>
                      {player.name}
                  </option>
                })}
              </select>
            </div>
          </div>
        </div>

        <div className='spacer' />

        <div className='row'>
          <div className='even-space sm'>
            <Link to='/'>Cancel</Link>
          </div>
          <div className='even-space sm'>
            <Link to='/players/new'>Create Player</Link>
          </div>
          <div className='even-space lg'>
            <button 
              disabled={!bothPlayersChosen} 
              onClick={() => browserHistory.push('/match/play')}>
              Continue
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}


MatchSetupView.propTypes = {
  waitingOnServer: PropTypes.bool, 
  playersData: PropTypes.object.isRequired, 
  firstPlayerId: PropTypes.number, 
  secondPlayerId: PropTypes.number,
  games: PropTypes.array,
  selectPlayer: PropTypes.func.isRequired
}

function mapStateToProps(state){
  const { appReducer } = state
  const { players, currentMatch } = appReducer
  const { firstPlayerId, secondPlayerId, games, waitingOnServer } = currentMatch
  
  return { 
    waitingOnServer, 
    playersData: players.data, 
    firstPlayerId, 
    secondPlayerId,
    games 
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectPlayer(key, event){
      dispatch(selectMatchPlayer({
        [key]: parseInt(event.target.value)
      }))
    }
  }
}

const MatchSetup = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchSetupView)

export default MatchSetup