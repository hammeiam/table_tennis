import React, { Component, PropTypes } from 'react'
import { connect, bindActionCreators } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { selectMatchPlayer, createNewGame } from './actions'
// import Match from './Match'

class MatchSetupView extends Component {
  constructor(props){
    super(props)
    this.selectFirstPlayer = this.selectFirstPlayer.bind(this)
    this.selectSecondPlayer = this.selectSecondPlayer.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  selectFirstPlayer(e){
    this.props.handlePlayerSelection({
      firstPlayerId: parseInt(e.target.value)
    })
  }

  selectSecondPlayer(e){
    this.props.handlePlayerSelection({
      secondPlayerId: parseInt(e.target.value)
    })
  }

  handleSubmit(winnerId, loserId){
    this.props.onSubmit(winnerId, loserId)
  }

  render(){
    const { recordingGame, playersData, firstPlayerId, secondPlayerId, games } = this.props
    const bothPlayersChosen = firstPlayerId !== -1 && secondPlayerId !== -1
    if(false){
      // return <Match 
      //         firstPlayer={playersData[firstPlayerId]} 
      //         secondPlayer={playersData[secondPlayerId]} 
      //         onSubmit={this.handleSubmit} />
    } else {
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
                    onChange={this.selectFirstPlayer}
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
                    onChange={this.selectSecondPlayer}
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
                  onClick={() => browserHistory.push({
                    pathname: '/match/play',
                    query: {
                      players: [firstPlayerId, secondPlayerId]
                    }
                  })}>
                  Continue
                </button>
              </div>
            </div>
          </section>
        </main>
      )
    }
  }
}

MatchSetupView.propTypes = {
  recordingGame: PropTypes.bool, 
  playersData: PropTypes.object.isRequired, 
  // firstPlayerId: PropTypes.string, 
  // secondPlayerId: PropTypes.string,
  games: PropTypes.array
}

function mapStateToProps(state){
  const { appReducer } = state
  const { recordingGame, playersData, currentMatch } = appReducer
  const { firstPlayerId, secondPlayerId, games } = currentMatch
  
  return { 
    recordingGame, 
    playersData, 
    firstPlayerId, 
    secondPlayerId,
    games 
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, selectMatchPlayer, createNewGame), dispatch)
}

function mergeProps(stateProps, dispatchProps, ownProps){
  // incurs rendering penalty, since this will be called every time props changes
  const { currentMatch } = stateProps
  const { selectMatchPlayer, createNewGame } = dispatchProps
  
  return {
    ...stateProps, // don't pass all state props down
    ...ownProps,
    handlePlayerSelection: (playerObj) => {
      selectMatchPlayer(playerObj)
    },
    onSubmit: () => {
      createNewGame(currentMatch)
    }
  }
}

const MatchSetup = connect(
  mapStateToProps,
  { selectMatchPlayer, createNewGame },
  mergeProps
)(MatchSetupView)

export default MatchSetup