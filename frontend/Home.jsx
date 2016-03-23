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
      <main>
        <section>
          <Leaderboard playersData={playersData} sortedPlayers={sortedPlayers} />
        </section>
        <section>
          <button 
            className=''
            onClick={() => browserHistory.push('/new_match')}>
            New Match
          </button>
          <button 
            className=''
            onClick={() => browserHistory.push('/new_player')}>
            New Player
          </button>
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