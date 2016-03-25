import { 
  RESET_PLAYER_FORM,
  CHANGE_PLAYER_FORM,
  POST_NEW_PLAYER, 
  RECEIVE_NEW_PLAYER_CONFIRMATION,
} from '../actions'

const initialPlayerFormState = {
  name: '',
  description: '',
  waitingOnServer: false
}

export default function playerForm(state = initialPlayerFormState, action){
  switch(action.type){
    case RECEIVE_NEW_PLAYER_CONFIRMATION:
    case RESET_PLAYER_FORM:
      return initialPlayerFormState

    case CHANGE_PLAYER_FORM:
      return Object.assign({}, state, action.payload)

    case POST_NEW_PLAYER:
      return Object.assign({}, state,
        { waitingOnServer: true })
      
    default:
      return state
  }
}