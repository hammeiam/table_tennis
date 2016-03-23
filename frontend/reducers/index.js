import { 
  RESET_PLAYER_FORM,
  CHANGE_PLAYER_FORM,
  POST_NEW_PLAYER, 
  RECEIVE_NEW_PLAYER_CONFIRMATION,
  REQUEST_UPDATED_PLAYERS,
  RECEIVE_UPDATED_PLAYERS, 
  RESET_CURRENT_MATCH,
  SELECT_MATCH_PLAYER,
  POST_NEW_GAME,
  RECEIVE_NEW_GAME_CONFIRMATION
} from '../actions'

// {
//   fetchingPlayers: bool
//   recordingPlayer: bool
//   recordingGame: bool

//   playersData: obj
//   sortedPlayers: arr

//   currentMatch: {
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

function selectMatchPlayer(state, action){
  const newCurrentMatch = Object.assign({}, state.currentMatch, action.payload)
  return Object.assign({}, state,
    { 
      currentMatch: newCurrentMatch
    })
}
// TODO: clear old playerForm data
const initialPlayerForm = {
  name: '',
  description: ''
}
const initialCurrentMatch = {
  firstPlayerId: -1,
  secondPlayerId: -1,
  games: []
}
const initialState = {
  sortedPlayers: [],
  playersData: {},
  playerForm: initialPlayerForm,
  currentMatch: initialCurrentMatch
}
function rootReducer(state = initialState, action){
  switch(action.type){
    case RESET_PLAYER_FORM:
      return Object.assign({}, state,
        { playerForm: initialPlayerForm })
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

    case RESET_CURRENT_MATCH:
      return Object.assign({}, state,
        { currentMatch: initialCurrentMatch })

    case SELECT_MATCH_PLAYER:
      return selectMatchPlayer(state, action)

    case POST_NEW_GAME:
      return Object.assign({}, state,
        { recordingGame: true })

    case RECEIVE_NEW_GAME_CONFIRMATION:
      return Object.assign({}, state,
        { 
          recordingGame: false,
          currentMatch: initialCurrentMatch
        })

    default:
      return state
  }
}

export default rootReducer