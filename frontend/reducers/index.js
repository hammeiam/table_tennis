import { combineReducers } from 'redux'
import players from './players'
import playerForm from './playerForm'
import currentMatch from './currentMatch'

// {
//   players: {
//     data: obj,
//     sorted: arr,
//     waitingOnServer: bool
//   }

//   currentMatch: {
//     player1: num
//     player2: num
//     games: arr
//     waitingOnServer: bool
//   }

//   playerForm: {
//     name:
//     description:
//     waitingOnServer: bool
//   }
// }

export default combineReducers({
  players,
  currentMatch,
  playerForm
})