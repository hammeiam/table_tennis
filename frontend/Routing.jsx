import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './configureStore'
import { getPlayers } from './actions'

import App from './App'
import Home from './Home'
import PlayerProfile from './PlayerProfile'
import NewPlayer from './NewPlayer'
import MatchContainer from './MatchContainer'

const Routing = ({store, history}) => {
  return(
    <Provider store={store}>
      <Router history={history}>
        <Route path='/' component={App}>
          <IndexRoute component={Home} />
          <Route path='new_match' component={MatchContainer} />
          <Route path='players/:id' component={PlayerProfile} />
          <Route path='new_player' component={NewPlayer} />
          <Route path='*' component={PlayerProfile}/>
        </Route>
      </Router>
    </Provider>
  )
}

export default Routing