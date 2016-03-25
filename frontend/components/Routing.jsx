import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { resetPlayerForm, resetCurrentMatch } from '../actions'

import App from './App'
import Home from './Home'
import PlayerProfile from './PlayerProfile'
import NewPlayer from './NewPlayer'
import MatchSetup from './MatchSetup'
import MatchPlay from './MatchPlay'


const Routing = ({store, history}) => {
  return(
    <Provider store={store}>
      <Router history={history}>
        <Route path='/' component={App}>
          <IndexRoute component={Home} />
          <Route 
            path='match/setup' 
            component={MatchSetup} 
            // onLeave={() => store.dispatch(resetCurrentMatch())}
          />
          <Route 
            path='match/play' 
            component={MatchPlay} 
          />
          <Route 
            path='players/new' 
            component={NewPlayer} 
            onLeave={() => store.dispatch(resetPlayerForm())}
          />
          <Route path='players/:id' component={PlayerProfile} />
          <Route path='*' component={PlayerProfile}/>
        </Route>
      </Router>
    </Provider>
  )
}
// TODO: how should match routing work? players via internal state or params?
// TODO: change onLeave to onChange
// TODO: create 404 page

export default Routing