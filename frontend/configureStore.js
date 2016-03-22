import { createStore, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import * as reducers from './reducers'

const reducer = combineReducers({
  ...reducers, 
  routing: routerReducer
})

export default function configureStore(initialState){
  return createStore(
    reducer,
    initialState,
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
}