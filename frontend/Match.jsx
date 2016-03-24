import React, { Component, PropTypes } from 'react'
import Game from './Game'

const initialState = {
  games: [],
  firstPlayerWins: 0,
  secondPlayerWins: 0
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
      winner: winnerId === this.props.firstPlayer.id ? this.props.firstPlayer : this.props.secondPlayer,
      loser: loserId === this.props.firstPlayer.id ? this.props.firstPlayer : this.props.secondPlayer
    }
    if(winnerId === this.props.firstPlayer){
      this.setState({
        games: this.state.games.concat([newGame]),
        firstPlayerWins: this.state.firstPlayerWins + 1
      })
    } else {
      this.setState({
        games: this.state.games.concat([newGame]),
        secondPlayerWins: this.state.secondPlayerWins + 1
      })
    }
  }

  handleSubmit(){
    // TODO: handle ties!
    const p1Wins = this.state.firstPlayerWins
    const p2Wins = this.state.secondPlayerWins
    const winnerId = p1Wins > p2Wins ? this.props.firstPlayer.id : this.props.secondPlayer.id
    const loserId = p1Wins < p2Wins ? this.props.firstPlayer.id : this.props.secondPlayer.id
    this.props.onSubmit(winnerId, loserId)
    this.setState(initialState)
  }

  render(){
    const { firstPlayer, secondPlayer } = this.props
    return (
      <div className='match'>
        <h2>{firstPlayer.name} vs. {secondPlayer.name}</h2>
        <div>
          {this.state.games.map((game,i) => {
            return <Game {...game} i={i+1} key={i}/>
          })}
          
          <div className='row'>
            <div className='cell'>Who won?</div>
            <div className='cell'>
              <button onClick={() => this.handleGameWin(firstPlayer.id, secondPlayer.id)}>
                {firstPlayer.name}
              </button>
            </div>
            <div className='cell'>
              <button onClick={() => this.handleGameWin(secondPlayer.id, firstPlayer.id)}>
                {secondPlayer.name}
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
  firstPlayer: PropTypes.object.isRequired,
  secondPlayer: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default Match