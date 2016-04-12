import { combineReducers } from 'redux'
import players from './players'
import playerForm from './playerForm'
import currentMatch from './currentMatch'

// {
//   players: {
//     data: obj
//     sorted: arr
//     waitingOnServer: bool
//   }

//   currentMatch: {
//     firstPlyerId: num,
//     firstPlyerScore: num,
//     secondPlyerId: num,
//     secondPlyerScore: num,
//     gameNumber: num
//     waitingOnServer: bool
//   }

//   playerForm: {
//     name: str
//     description: str
//     waitingOnServer: bool
//   }
// }

export default combineReducers({
  players,
  currentMatch,
  playerForm
})
