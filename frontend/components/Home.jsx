import React, { PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'
import Leaderboard from './Leaderboard'

// TODO: Link vs push for buttons
const Home = () => {
  return (
    <main className='row'>
      <section className='col-50'>
        <Leaderboard />
      </section>
      <section className='col-50'>
        <div className='even-space lg'>
          <button 
            className=''
            onClick={() => browserHistory.push('/match/setup')}>
            New Match
          </button>
        </div>
        <div className='even-space lg'>
          <button 
            className=''
            onClick={() => browserHistory.push('/players/new')}>
            New Player
          </button>
        </div>
      </section>
    </main>
  )
}

export default Home