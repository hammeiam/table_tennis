import 'babel-polyfill' // must be first thing
import React, { Component } from 'react'
import Routing from './Routing'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './configureStore'
import { getPlayers } from './actions'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

document.addEventListener('DOMContentLoaded', function(){
  // fetch player data to kick things off
  store.dispatch(getPlayers())

  render(
    <Routing store={store} history={history} />,
    document.getElementById('app')
  )
})
