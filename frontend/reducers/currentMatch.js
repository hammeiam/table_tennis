import {
  RESET_CURRENT_MATCH,
  RECORD_PLAYER_SCORE,
  SELECT_MATCH_PLAYER,
  POST_NEW_MATCH,
  RECEIVE_NEW_MATCH_CONFIRMATION
} from '../actions'

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

    case RECORD_PLAYER_SCORE:
      const oldScore = state[action.whichPlayer + 'Score']
      return Object.assign({}, state, {
        [action.whichPlayer + 'Score']: oldScore + 1,
        gameNumber: state.gameNumber + 1
       })

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
