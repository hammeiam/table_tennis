import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import Leaderboard from './Leaderboard'

export class HomeView extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const { playersData, sortedPlayers } = this.props

    return (
      <main className='row'>
        <section className='col-50'>
          <Leaderboard playersData={playersData} sortedPlayers={sortedPlayers} />
        </section>
        <section className='col-50'>
          <div className='even-space lg'>
            <button 
              className=''
              onClick={() => browserHistory.push('/new_match')}>
              New Match
            </button>
          </div>
          <div className='even-space lg'>
            <button 
              className=''
              onClick={() => browserHistory.push('/new_player')}>
              New Player
            </button>
          </div>
        </section>
      </main>
    )
  }
}

HomeView.propTypes = {
  playersData: PropTypes.object,
  sortedPlayers: PropTypes.arrayOf(PropTypes.number).isRequired
}

const mapStateToProps = (state) => {
  const { rootReducer } = state
  const { playersData, sortedPlayers } = rootReducer
  return {
    playersData,
    sortedPlayers
  }
}

const Home = connect(
  mapStateToProps,
  null
)(HomeView)

export default Home