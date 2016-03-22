/*
*   PLAYERS
*/
export const CREATE_PLAYER = 'CREATE_PLAYER'
export const POST_NEW_PLAYER = 'POST_NEW_PLAYER'
export const RECEIVE_UPDATED_PLAYERS = 'RECEIVE_UPDATED_PLAYERS'

export function postNewPlayer(player){
  return {
    type: POST_NEW_PLAYER,
    player
  }
}

export function receiveUpdatedPlayers(players){
  return {
    type: RECEIVE_UPDATED_PLAYERS,
    player
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
    .then(updatedPlayers => dispatch(receiveUpdatedPlayers(updatedPlayers)))
  }
}

/*
*   GAMES
*/
export const CREATE_GAME = 'CREATE_GAME'
export const POST_NEW_GAME = 'POST_NEW_GAME'

export function postNewGame(game){
  return {
    type: POST_NEW_PLAYER,
    game
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
    .then(updatedPlayers => dispatch(receiveUpdatedPlayers(updatedPlayers)))
  }
}