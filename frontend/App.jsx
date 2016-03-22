import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'
import { getPlayers } from '../actions'

class App extends Component {
  constructor(props){
    super(props)
  }
  
  componentDidMount(){
    // fetch player data to kick things off
    getPlayers()
  }

  render(){
    const { children } = this.props
    return (
      <div>
        <header>
          <h1>PING PONG</h1>
        </header>

        <nav>
          Some links
        </nav>

        <main>
          {children}
        </main>
      </div>
    )
  }
}

App.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.element),
    React.PropTypes.element
  ])
}

export default App