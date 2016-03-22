// TODO: handle errors

/*
*   PLAYERS
*/
export const CREATE_PLAYER = 'CREATE_PLAYER'
export const POST_NEW_PLAYER = 'POST_NEW_PLAYER'
export const RECEIVE_NEW_PLAYER_CONFIRMATION = 'RECEIVE_NEW_PLAYER_CONFIRMATION'
export const REQUEST_UPDATED_PLAYERS = 'REQUEST_UPDATED_PLAYERS'
export const RECEIVE_UPDATED_PLAYERS = 'RECEIVE_UPDATED_PLAYERS'

export function postNewPlayer(player){
  return {
    type: POST_NEW_PLAYER,
    player
  }
}

export function receiveNewPlayerConfirmation(){
  return {
    type: RECEIVE_NEW_PLAYER_CONFIRMATION
  }
}


export function requestUpdatedPlayers(){
  return {
    type: REQUEST_UPDATED_PLAYERS
  }
}

export function receiveUpdatedPlayers(players){
  return {
    type: RECEIVE_UPDATED_PLAYERS,
    players
  }
}

export function getPlayers(){
  return function(dispatch){
    dispatch(requestUpdatedPlayers())

    return fetch('/players')
      .then(resp => resp.json())
      .then(updatedPlayers => dispatch(receiveUpdatedPlayers(updatedPlayers)))
  }
}

export function createNewPlayer(player){
  return function(dispatch){
    dispatch(postNewPlayer(player))

    return fetch('/players', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        player
      })
    })
    .then(resp => resp.json())
    .then(updatedPlayers => {
      dispatch(receiveUpdatedPlayers(updatedPlayers))
      dispatch(receiveNewPlayerConfirmation())
    })
  }
}

/*
*   GAMES
*/
export const CREATE_GAME = 'CREATE_GAME'
export const POST_NEW_GAME = 'POST_NEW_GAME'
export const RECEIVE_NEW_GAME_CONFIRMATION = 'RECEIVE_NEW_GAME_CONFIRMATION'


export function postNewGame(game){
  return {
    type: POST_NEW_GAME,
    game
  }
}

export function receiveNewGameConfirmation(){
  return {
    type: RECEIVE_NEW_GAME_CONFIRMATION
  }
}

export function createNewGame(game){
  return function(dispatch){
    dispatch(postNewGame(game))

    return fetch('/games', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        game
      })
    })
    .then(resp => resp.json())
    .then(updatedPlayers => {
      dispatch(receiveUpdatedPlayers(updatedPlayers))
      dispatch(receiveNewGameConfirmation())
    })
  }
}