import {
  RESET_CURRENT_MATCH,
  ADD_GAME_TO_MATCH,
  SELECT_MATCH_PLAYER,
  POST_NEW_MATCH,
  RECEIVE_NEW_MATCH_CONFIRMATION
} from '../actions'

// const initialCurrentMatchState = {
//   firstPlayerId: -1,
//   secondPlayerId: -1,
//   games: [],
//   waitingOnServer: false
// }

const initialCurrentMatchState =  {
  firstPlayerId: -1,
  firstPlayerScore: 0,
  secondPlayerId: -1,
  secondPlayerScore: 0,
  gameNumber: 1,
  waitingOnServer: false
}

export default function currentMatch(state = initialCurrentMatchState, action){
  switch(action.type){
    case RECEIVE_NEW_MATCH_CONFIRMATION:
    case RESET_CURRENT_MATCH:
      return initialCurrentMatchState

    case ADD_GAME_TO_MATCH:
      // TODO: this

    case SELECT_MATCH_PLAYER:
      // payload: { firstPlayerId: 3 }
      return Object.assign({}, state, action.payload)

    case POST_NEW_MATCH:
      return Object.assign({}, state,
        { waitingOnServer: true })

    default:
      return state
  }
}
