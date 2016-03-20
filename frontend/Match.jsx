import React, { Component, PropTypes } from 'react'
import Game from './Game'

const initialState = {
  games: [],
  player1Wins: 0,
  player2Wins: 0
}

class Match extends Component {
  constructor(props){
    super(props)
    this.state = initialState
    this.handleGameWin = this.handleGameWin.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleGameWin(winnerId, loserId){
    const newGame = {
      winner: winnerId === this.props.player1.id ? this.props.player1 : this.props.player2,
      loser: loserId === this.props.player1.id ? this.props.player1 : this.props.player2
    }
    if(winnerId === this.props.player1){
      this.setState({
        games: this.state.games.concat([newGame]),
        player1Wins: this.state.player1Wins + 1
      })
    } else {
      this.setState({
        games: this.state.games.concat([newGame]),
        player2Wins: this.state.player2Wins + 1
      })
    }
  }

  handleSubmit(){
    // TODO: handle ties!
    const p1Wins = this.state.player1Wins
    const p2Wins = this.state.player2Wins
    const winnerId = p1Wins > p2Wins ? this.props.player1.id : this.props.player2.id
    const loserId = p1Wins < p2Wins ? this.props.player1.id : this.props.player2.id
    this.props.onSubmit(winnerId, loserId)
    this.setState(initialState)
  }

  render(){
    const { player1, player2 } = this.props
    return (
      <div className='match'>
        <h2>{player1.name} vs. {player2.name}</h2>
        <div>
          {this.state.games.map((game,i) => {
            return <Game {...game} i={i+1} key={i}/>
          })}
          
          <div className='row'>
            <div className='cell'>Who won?</div>
            <div className='cell'>
              <button onClick={() => this.handleGameWin(player1.id, player2.id)}>
                {player1.name}
              </button>
            </div>
            <div className='cell'>
              <button onClick={() => this.handleGameWin(player2.id, player1.id)}>
                {player2.name}
              </button>
            </div>
          </div>
        </div>

        <button onClick={this.handleSubmit}>End Match</button>
      </div>
    )
  }
}

Match.propTypes = {
  player1: PropTypes.object.isRequired,
  player2: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default Match