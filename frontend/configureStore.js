import thunkMiddleware from 'redux-thunk'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { routerReducer } from 'react-router-redux'
import rootReducer from './reducers'

const reducer = combineReducers({
  rootReducer, 
  routing: routerReducer
})

export default function configureStore(initialState){
  return createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(thunkMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
}