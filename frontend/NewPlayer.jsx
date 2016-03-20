import React, { Component, PropTypes } from 'react'

class NewPlayer extends Component {
  constructor(props){
    super(props)
    this.state = {
      player_name: '',
      player_desc: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  onSubmit(event){
    const name = this.state.player_name
    const desc = this.state.player_desc
    this.props.onSubmit({
      name,
      desc
    })
    this.setState({
      player_name: '',
      player_desc: ''
    })
  }

  render(){
    return (
      <div className='newPlayer'>
        <h2>New Player</h2>
        <label htmlFor='player_name'>Name</label>
        <input 
          id='player_name' 
          ref='player_name' 
          value={this.state.player_name} 
          onChange={this.handleChange} />

        <label htmlFor='player_name'>Description</label>
        <textarea 
          id='player_desc' 
          ref='player_desc' 
          value={this.state.player_desc} 
          onChange={this.handleChange} />
        <button onClick={this.onSubmit}>Create!</button>
      </div>
    )
  }
} 
  
NewPlayer.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default NewPlayer