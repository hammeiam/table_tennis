import React, { Component } from 'react'
import { render } from 'react-dom'

class Player extends Component {
  constructor(props){
    super(props)
    this.state = {
      players: [],
      player_name: '',
      player_desc: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.updateState()
  }

  updateState(){
    fetch('http://localhost:3000/players').then(players => {
      players.json().then(players => (players) ).then(players => {
        this.setState({players})
      })
    })
  }

  createGame(winnerId, loserId ){
    fetch('http://localhost:3000/games', {
      method: 'post',
      body: JSON.stringify({
        winner_id: winnerId,
        loser_id: loserId
      })
    }).then(t => this.updateState())
  }

  onSubmit(e){
    const name = this.state.player_name
    const desc = this.state.player_desc
    fetch('http://localhost:3000/players', {
      method: 'post',
      headers: {  
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
      },
      body: `name=${name}&description=${desc}`
    }).then(t => this.updateState())
  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  render(){
    return (
      <div>
        <h1>Players</h1>
        {this.state.players.map(player => {
          const won = player.won_games.length
          return (
            <div className='player'>
              <span>Name: {player.name}</span>
              {' '}
              <span>Won: {player.won_games.length}</span>
              {' '}
              <span>Lost: {player.lost_games.length}</span>
            </div>
            )
          })
        }
        {' '}
        <h1>New Player</h1>
        <label htmlFor='player_name'>Name</label>
        <input id='player_name' ref='player_name' value={this.state.player_name} onChange={this.handleChange} />

        <label htmlFor='player_name'>Description</label>
        <textarea id='player_desc' ref='player_desc' value={this.state.player_desc} onChange={this.handleChange} />
        <button onClick={this.onSubmit}>Create!</button>
      </div>
    )
  }
}

render(
  <Player />,
  document.getElementById('app')
)