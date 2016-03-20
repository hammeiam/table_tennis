import React, { Component, PropTypes } from 'react'
import Match from './Match'

class MatchWrapper extends Component {
  constructor(props){
    super(props)
    this.state = {}
    this.selectPlayer1 = this.selectPlayer1.bind(this)
    this.selectPlayer2 = this.selectPlayer2.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  selectPlayer1(e){
    this.setState({
      player1: this.props.players[e.target.value]
    })
  }

  selectPlayer2(e){
    this.setState({
      player2: this.props.players[e.target.value]
    })
  }

  handleSubmit(winnerId, loserId){
    this.props.onSubmit(winnerId, loserId)
    this.setState({
      player1: undefined,
      player2: undefined
    })
  }

  render(){
    if(this.state.player1 && this.state.player2){
      return <Match 
              player1={this.state.player1} 
              player2={this.state.player2} 
              onSubmit={this.handleSubmit} />
    } else {
      const selectOption = {
        id: -1,
        name: 'Select Player'
      }
      const playerOptions = [selectOption].concat(this.props.sortedPlayers.map(playerId => {
        return this.props.players[playerId]
      }))
      return (
        <div>
          <h2>Choose Players</h2>
          <div>
            <select 
              id='selectPlayer1'
              value={this.state.player1 ? this.state.player1.id : playerOptions[0]}
              onChange={this.selectPlayer1}
              >
              {playerOptions.filter(player => {
                if(!this.state.player2){ return true }
                return player.id !== this.state.player2.id
              }).map(player => {
                return <option key={player.id} value={player.id}>{player.name}</option>
              })}
            </select>
          </div>
          <div>
            <select 
              id='selectPlayer1'
              value={this.state.player2 ? this.state.player2.id : playerOptions[0]}
              onChange={this.selectPlayer2}
              >
              {playerOptions.filter(player => {
                if(!this.state.player1){ return true }
                return player.id !== this.state.player1.id
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

MatchWrapper.propTypes = {
  players: PropTypes.object.isRequired,
  sortedPlayers: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default MatchWrapper