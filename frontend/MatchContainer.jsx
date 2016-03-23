import React, { Component, PropTypes } from 'react'
import { connect, bindActionCreators } from 'react-redux'
import { selectMatchPlayer, createNewGame } from './actions'
import Match from './Match'

class MatchContainerView extends Component {
  constructor(props){
    super(props)
    this.selectFirstPlayer = this.selectFirstPlayer.bind(this)
    this.selectSecondPlayer = this.selectSecondPlayer.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  selectFirstPlayer(e){
    this.props.handlePlayerSelection({
      firstPlayerId: e.target.value
    })
  }

  selectSecondPlayer(e){
    this.props.handlePlayerSelection({
      secondPlayerId: e.target.value
    })
  }

  handleSubmit(winnerId, loserId){
    this.props.onSubmit(winnerId, loserId)
  }

  render(){
    const { recordingGame, playersData, firstPlayerId, secondPlayerId, games } = this.props

    if(firstPlayerId !== -1 && secondPlayerId !== -1){
      return <div>got them players</div>
      // return <Match 
      //         firstPlayerId={this.state.firstPlayerId} 
      //         secondPlayerId={this.state.secondPlayerId} 
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
        <div>
          <h2>Choose Players</h2>
          <div>
            <select 
              id='selectPlayer1'
              value={firstPlayerId}
              onChange={this.selectFirstPlayer}
              >
              {playerOptions.filter(player => {
                if(firstPlayerId === -1){ return true }
                return player.id !== secondPlayerId
              }).map(player => {
                return <option key={player.id} value={player.id}>{player.name}</option>
              })}
            </select>
          </div>
          <div>
            <select 
              id='selectPlayer1'
              value={secondPlayerId}
              onChange={this.selectSecondPlayer}
              >
              {playerOptions.filter(player => {
                if(secondPlayerId === -1){ return true }
                return player.id !== firstPlayerId
              }).map(player => {
                return <option key={player.id} value={player.id}>{player.name}</option>
              })}
            </select>
          </div>
        </div>
      )
    }
  }
}

MatchContainerView.propTypes = {
  recordingGame: PropTypes.bool, 
  playersData: PropTypes.object.isRequired, 
  // firstPlayerId: PropTypes.string, 
  // secondPlayerId: PropTypes.string,
  games: PropTypes.array
}

function mapStateToProps(state){
  const { rootReducer } = state
  const { recordingGame, playersData, currentMatch } = rootReducer
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

const MatchContainer = connect(
  mapStateToProps,
  { selectMatchPlayer, createNewGame },
  mergeProps
)(MatchContainerView)

export default MatchContainer