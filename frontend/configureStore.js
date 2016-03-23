import thunkMiddleware from 'redux-thunk'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
// import { routerReducer } from 'react-router-redux'
import { browserHistory } from 'react-router'
import rootReducer from './reducers'
import { routerReducer,routerMiddleware, push } from 'react-router-redux'

const routingMiddleware = routerMiddleware(browserHistory)

const reducer = combineReducers({
  rootReducer, 
  routing: routerReducer
})

export default function configureStore(initialState){
  return createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(thunkMiddleware, routingMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
}