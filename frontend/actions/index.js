// TODO: require polyfill for fetch
// TODO: handle errors
import { push } from 'react-router-redux'

/*
*   PLAYERS
*/
export const RESET_PLAYER_FORM = 'RESET_PLAYER_FORM'
export const CHANGE_PLAYER_FORM = 'CHANGE_PLAYER_FORM'
export const CREATE_PLAYER = 'CREATE_PLAYER'
export const POST_NEW_PLAYER = 'POST_NEW_PLAYER'
export const RECEIVE_NEW_PLAYER_CONFIRMATION = 'RECEIVE_NEW_PLAYER_CONFIRMATION'
export const REQUEST_UPDATED_PLAYERS = 'REQUEST_UPDATED_PLAYERS'
export const RECEIVE_UPDATED_PLAYERS = 'RECEIVE_UPDATED_PLAYERS'

export function resetPlayerForm(){
  return {
    type: RESET_PLAYER_FORM
  }
}

export function changePlayerForm(fieldObj){
  return {
    type: CHANGE_PLAYER_FORM,
    payload: fieldObj
  }
}

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
  console.log('getting players')
  return function(dispatch){
    dispatch(requestUpdatedPlayers())

    return fetch('/api/players')
      .then(resp => resp.json())
      .then(updatedPlayers => dispatch(receiveUpdatedPlayers(updatedPlayers)))
  }
}

export function createNewPlayer(player){
  // TODO: error handling
  return function(dispatch){
    dispatch(postNewPlayer(player))

    return fetch('/api/players', {
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
      // TODO: review if this is kosher. redir to profile page.
      dispatch(push('/'))
    })
  }
}

/*
*   MATCHES
*/
export const RESET_CURRENT_MATCH = 'RESET_CURRENT_MATCH'
export const RECORD_PLAYER_SCORE = 'RECORD_PLAYER_SCORE'
export const SELECT_MATCH_PLAYER = 'SELECT_MATCH_PLAYER'
export const CREATE_MATCH = 'CREATE_MATCH'
export const POST_NEW_MATCH = 'POST_NEW_MATCH'
export const RECEIVE_NEW_MATCH_CONFIRMATION = 'RECEIVE_NEW_MATCH_CONFIRMATION'

export function resetCurrentMatch(){
  return {
    type: RESET_CURRENT_MATCH
  }
}

export function recordPlayerScore(whichPlayer) {
  return {
    type: RECORD_PLAYER_SCORE,
    whichPlayer
  }
}

export function selectMatchPlayer(playerObj){
  return {
    type: SELECT_MATCH_PLAYER,
    payload: playerObj
  }
}

export function postNewMatch(){
  return {
    type: POST_NEW_MATCH
  }
}

export function receiveNewMatchConfirmation(){
  return {
    type: RECEIVE_NEW_MATCH_CONFIRMATION
  }
}

export function createNewMatch(winnerId, loserId){
  // {winner_id: 1, loser_id: 2}
  // TODO: change game to match on the backend
  const match = {
    winner_id: winnerId,
    loser_id: loserId
  }
  return function(dispatch){
    dispatch(postNewMatch())

    return fetch('/api/games', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        game: match
      })
    })
    .then(resp => resp.json())
    .then(updatedPlayers => {
      dispatch(push('/'))
      dispatch(receiveUpdatedPlayers(updatedPlayers))
      dispatch(receiveNewMatchConfirmation())
    })
  }
}
