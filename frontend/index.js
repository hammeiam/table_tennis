import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './configureStore'

import App from './App'
import Home from './Home'
import Leaderboard from './Leaderboard'
import NewPlayer from './NewPlayer'
import MatchWrapper from './MatchWrapper'


const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={Home}/>
        <Route path='/match' component={MatchContainer} />
        <Route path='/player/:id' component={Player} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)

class Player extends Component {
  constructor(props){
    super(props)
    this.state = {
      players: {},
      sortedPlayers: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateState = this.updateState.bind(this)
    this.createGame = this.createGame.bind(this)
  }

  componentDidMount() {
    this.updateState()
  }

  updateState(){
    fetch('http://localhost:3000/players').then(players => {
      players.json().then(players => (players) ).then(players => {
        const newSortedPlayers = []
        const newPlayers = {}

        players.forEach(player => {
          newSortedPlayers.push(player.id)
          newPlayers[player.id] = player
        })
        this.setState({
          players: newPlayers,
          sortedPlayers: newSortedPlayers
        })
      })
    })
  }

  createGame(winnerId, loserId){
    // TODO: handle ties
    fetch('http://localhost:3000/games', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        game: {
          winner_id: winnerId,
          loser_id: loserId
        }
      })
    }).then(t => this.updateState())
  }

  handleSubmit({name, desc}){
    fetch('http://localhost:3000/players', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        player: {
          name,
          description: desc
        }
      })
      // `name=${name}&description=${desc}`
    }).then(t => this.updateState())
  }

  render(){
    return (
      <div>
        <Leaderboard {...this.state} />
        {' '}
        <MatchWrapper {...this.state} onSubmit={this.createGame}/>
        <NewPlayer onSubmit={this.handleSubmit} />
      </div>
    )
  }
}

