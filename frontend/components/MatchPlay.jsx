import React, { Component, PropTypes } from 'react'
import { connect, bindActionCreators } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { selectMatchPlayer, createNewGame } from '../actions'
import Game from './Game'

// const initialState = {
//   games: [],
//   firstPlayerWins: 0,
//   secondPlayerWins: 0
// }

class MatchPlayView extends Component {
  constructor(props){
    super(props)
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
    // const { location } = this.props
    // const { query } = this.props.location
    // const players = query && query.players
    // const [ firstPlayer, secondPlayer ] = players.map(id => playersData[id])
    const {
      waitingOnServer,
      playersData,
      firstPlayerId,
      secondPlayerId,
      games,
      onSubmit
    } = this.props
    const [firstPlayer, secondPlayer] = [firstPlayerId,secondPlayerId].map(id => playersData[id])
    // debugger
    return (
      <main className='row match-play'>
        <section className='col-60'>
          <div className='row'>
            <div className='row'>
              <div>
                <div className='match-score'>8</div>
                <h2>{firstPlayer.name}</h2>
              </div>
            </div>
            <div className='row'>
              <h2>vs.</h2>
            </div>
            <div className='row'>
              <div>
                <div className='match-score'>8</div>
                <h2>{secondPlayer.name}</h2>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='row'>
              <button onClick={() => this.handleGameWin(firstPlayer.id, secondPlayer.id)}>
                Won?
              </button>
            </div>
            <div className='row'>
              <h2>Game 7</h2>
            </div>
            <div className='row'>
              <button onClick={() => this.handleGameWin(secondPlayer.id, firstPlayer.id)}>
                Won?
              </button>
            </div>
          </div>
          <div className='spacer' />
          <div className='row'>
            <button onClick={this.handleSubmit}>End Match</button>
          </div>
        </section>
      </main>
    )
  }
}

// MatchPlay.propTypes = {
//   firstPlayer: PropTypes.object.isRequired,
//   secondPlayer: PropTypes.object.isRequired,
//   onSubmit: PropTypes.func.isRequired
// }

function mapStateToProps(state){
  const { appReducer } = state
  const { players, currentMatch } = appReducer
  const { firstPlayerId, secondPlayerId, games, waitingOnServer } = currentMatch
  // debugger
  return {
    waitingOnServer,
    playersData: players.data,
    firstPlayerId,
    secondPlayerId,
    games
  }
}

function mapDispatchToProps(dispatch) {
  // return bindActionCreators(createNewGame, dispatch)
  return {
    onSubmit(){
      dispatch(createNewGame())
    }
  }
}


const MatchPlay = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchPlayView)

export default MatchPlay
