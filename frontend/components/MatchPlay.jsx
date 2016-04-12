import React, { Component, PropTypes } from 'react'
import { connect, bindActionCreators } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { recordPlayerScore, createNewMatch } from '../actions'

// class MatchPlayView extends Component {
const MatchPlayView = ({
  waitingOnServer,
  playersData,
  firstPlayerId,
  firstPlayerScore,
  secondPlayerId,
  secondPlayerScore,
  gameNumber,
  handleSubmit,
  handleScore
}) => {

  const onSubmit = () => {
    const winnerId = firstPlayerScore > secondPlayerScore ? firstPlayerId : secondPlayerId
    const loserId = firstPlayerScore < secondPlayerScore ? firstPlayerId : secondPlayerId
    handleSubmit(winnerId, loserId)
  }
  const [firstPlayer, secondPlayer] = [firstPlayerId,secondPlayerId].map(id => playersData[id])

  return (
    <main className='row match-play'>
      <section className='col-60'>
        <div className='row'>
          <div className='row'>
            <div>
              <div className='match-score'>{firstPlayerScore}</div>
              <h2>{firstPlayer.name}</h2>
            </div>
          </div>
          <div className='row'>
            <h2>vs.</h2>
          </div>
          <div className='row'>
            <div>
              <div className='match-score'>{secondPlayerScore}</div>
              <h2>{secondPlayer.name}</h2>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='row'>
            <button onClick={() => handleScore('firstPlayer')}>
              Won?
            </button>
          </div>
          <div className='row'>
            <h2>Game {gameNumber}</h2>
          </div>
          <div className='row'>
            <button onClick={() => handleScore('secondPlayer')}>
              Won?
            </button>
          </div>
        </div>
        <div className='spacer' />
        <div className='row'>
          <div className='even-space sm'>
            <Link to='/'>Cancel</Link>
          </div>
          <div className='even-space lg'>
            <button onClick={onSubmit}>End Match</button>
          </div>

        </div>
      </section>
    </main>
  )
}

// MatchPlay.propTypes = {
//   firstPlayer: PropTypes.object.isRequired,
//   secondPlayer: PropTypes.object.isRequired,
//   onSubmit: PropTypes.func.isRequired
// }

function mapStateToProps(state){
  const { appReducer } = state
  const { players, currentMatch } = appReducer
  // debugger
  return {
    ...currentMatch,
    playersData: players.data
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleSubmit(winnerId, loserId){
      dispatch(createNewMatch(winnerId, loserId))
    },
    handleScore(playerId){
      dispatch(recordPlayerScore(playerId))
    }
  }
}


const MatchPlay = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchPlayView)

export default MatchPlay
