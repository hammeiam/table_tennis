import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './configureStore'
import { resetPlayerForm, resetCurrentMatch } from './actions'

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
          <Route 
            path='new_match' 
            component={MatchContainer} 
            onLeave={() => store.dispatch(resetCurrentMatch())}
          />
          <Route path='players/:id' component={PlayerProfile} />
          <Route 
            path='new_player' 
            component={NewPlayer} 
            onLeave={() => store.dispatch(resetPlayerForm())}
          />
          <Route path='*' component={PlayerProfile}/>
        </Route>
      </Router>
    </Provider>
  )
}

export default Routing