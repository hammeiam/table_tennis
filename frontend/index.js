import 'babel-polyfill' // must be first thing
import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './configureStore'
import { getPlayers } from './actions'

import App from './App'
import Home from './Home'
// import PlayerProfile from './PlayerProfile'
// import NewPlayer from './NewPlayer'
import MatchContainer from './MatchContainer'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)
const Dummy = () => {
  return (<div>Dummy</div>)
}

document.addEventListener('DOMContentLoaded', function(){
  // fetch player data to kick things off
  store.dispatch(getPlayers())

  render(
    <Provider store={store}>
      <Router history={history}>
        <Route path='/' component={App}>
          <IndexRoute component={Home} />
          <Route path='new_match' component={MatchContainer} />
          <Route path='players/:id' component={Dummy} />
          <Route path='new_player' component={Dummy} />
          <Route path='*' component={Dummy}/>
        </Route>
      </Router>
    </Provider>,
    document.getElementById('app')
  )
})
