import { 
  CHANGE_PLAYER_FORM,
  POST_NEW_PLAYER, 
  RECEIVE_NEW_PLAYER_CONFIRMATION,
  REQUEST_UPDATED_PLAYERS,
  RECEIVE_UPDATED_PLAYERS, 
  POST_NEW_GAME,
  RECEIVE_NEW_GAME_CONFIRMATION
} from '../actions'

// {
//   fetchingPlayers: bool
//   recordingPlayer: bool
//   recordingGame: bool

//   playersData: obj
//   sortedPlayers: arr

//   match: {
//     player1: num
//     player2: num
//     games: arr
//   }

//   playerForm: {
//     name:
//     description:
//   }
// }

function changePlayerForm(state, action){
  const newPlayerForm = Object.assign({}, state.playerForm, action.payload)
  return Object.assign({}, state,
    { 
      playerForm: newPlayerForm
    })
}

function receiveUpdatedPlayers(state = {}, action){
  const playersData = {}
  const sortedPlayers = []
  action.players.forEach(player => {
    playersData[player.id] = player
    sortedPlayers.push(player.id)
  })
  return Object.assign(
    {}, 
    state,
    { 
      fetchingPlayers: false,
      playersData,
      sortedPlayers
    }
  )
}
// TODO: clear old playerForm data
const initialPlayerForm = {
  name: '',
  description: ''
}
const initialState = {
  sortedPlayers: [],
  playerForm: initialPlayerForm
}
function rootReducer(state = initialState, action){
  switch(action.type){
    case CHANGE_PLAYER_FORM:
      return changePlayerForm(state, action)

    case POST_NEW_PLAYER:
      return Object.assign({}, state,
        { recordingPlayer: true })

    case RECEIVE_NEW_PLAYER_CONFIRMATION:
      return Object.assign({}, state,
        { 
          recordingPlayer: false,
          playerForm: initialPlayerForm
        })

    case REQUEST_UPDATED_PLAYERS:
      return Object.assign({}, state,
        { fetchingPlayers: true })

    case RECEIVE_UPDATED_PLAYERS:
      return receiveUpdatedPlayers(state, action)

    case POST_NEW_GAME:
      return Object.assign({}, state,
        { recordingGame: true })

    case RECEIVE_NEW_GAME_CONFIRMATION:
      return Object.assign({}, state,
        { recordingGame: false })

    default:
      return state
  }
}

export default rootReducer