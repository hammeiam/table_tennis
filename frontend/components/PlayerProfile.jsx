import React, { Component } from 'react'
import { connect } from 'react-redux'

// const PlayerProfile = ({ params }) => {
class PlayerProfileView extends Component {
  render(){
    const {players, params} = this.props
    const player = players[params.id]

     if(!player){ return (<h1>loading</h1>) }

    return (
      <main className='row'>
        <section className='col-100'>
          <div>
            <h1>{player.name}</h1>
            <p>{player.description}</p>

          </div>
        </section>
      </main>

    )
  }

}
function mapStateToProps(state){
  const { appReducer } = state
  const { players } = appReducer

  return {
    players: players.data
  }
}

const PlayerProfile = connect(
  mapStateToProps,
  null
)(PlayerProfileView)

export default PlayerProfile