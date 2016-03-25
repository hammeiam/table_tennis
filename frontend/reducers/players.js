import { 
  REQUEST_UPDATED_PLAYERS,
  RECEIVE_UPDATED_PLAYERS
} from '../actions'

function receiveUpdatedPlayers(state = {}, action){
  const data = {}
  const sorted = []

  action.players.forEach(player => {
    data[player.id] = player
    sorted.push(player.id)
  })
  
  return Object.assign({}, state,
    { 
      waitingOnServer: false,
      data,
      sorted
    }
  )
}

const initialPlayersState = {
  sorted: [],
  data: {},
  waitingOnServer: false
}

export default function players(state = initialPlayersState, action){
  switch(action.type){
    case REQUEST_UPDATED_PLAYERS:
      return Object.assign({}, state,
        { waitingOnServer: true })

    case RECEIVE_UPDATED_PLAYERS:
      return receiveUpdatedPlayers(state, action)  

    default: 
      return state
  }
}