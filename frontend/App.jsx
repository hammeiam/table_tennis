import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'
import './app.less'

// const App = ({ children }) => {
class App extends Component{
  constructor(props){super(props)}
  render(){
    const { children } = this.props
  return (
    <div className='container'>
      <header>
        <h1>PING PONGS</h1>
      </header>

      {children}
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