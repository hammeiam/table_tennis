import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'

const App = ({children}) => {
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

App.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.element),
    React.PropTypes.element
  ])
}

export default App