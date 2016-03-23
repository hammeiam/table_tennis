import React, { Component, PropTypes } from 'react'
import { connect, bindActionCreators } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { createNewPlayer, changePlayerForm } from './actions'

// TODO: clear form on new route?
class NewPlayerView extends Component {
  constructor(props){
    super(props)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
  }

  handleNameChange(event) {
    this.props.handleChange({
      name: event.target.value
    });
  }

  handleDescriptionChange(event) {
    this.props.handleChange({
      description: event.target.value
    });
  }

  render(){
    const { playerForm, recordingPlayer, onSubmit } = this.props
    const { name, description} = playerForm
    return (
      <div className='newPlayer'>
        <h2>New Player</h2>
        {recordingPlayer &&
          'Loading...'}
        <label htmlFor='player_name'>Name</label>
        <input 
          id='player_name' 
          value={name} 
          onChange={this.handleNameChange} />

        <label htmlFor='player_name'>Description</label>
        <textarea 
          id='player_desc' 
          value={description} 
          onChange={this.handleDescriptionChange} />
        <button onClick={onSubmit}>Create!</button>
      </div>
    )
  }
} 
  
NewPlayerView.propTypes = {
}

function mapStateToProps(state){
  const { rootReducer } = state
  const { recordingPlayer, playerForm } = rootReducer

  return {
    recordingPlayer,
    playerForm
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, createNewPlayer, changePlayerForm), dispatch)
}

function mergeProps(stateProps, dispatchProps, ownProps){
  // incurs rendering penalty, since this will be called every time props changes
  const { playerForm } = stateProps
  const { createNewPlayer, changePlayerForm } = dispatchProps
  
  return {
    ...stateProps, // don't pass all state props down
    ...ownProps,
    handleChange: (fieldObj) => {
      changePlayerForm(fieldObj)
    },
    onSubmit: () => {
      // TODO: client side error handling
      createNewPlayer(playerForm)
    }
  }
}

const NewPlayer = connect(
  mapStateToProps,
  { createNewPlayer, changePlayerForm },
  mergeProps
)(NewPlayerView)

export default NewPlayer