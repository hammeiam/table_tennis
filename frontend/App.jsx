import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'
import './app.less'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


const App = ({ children }) => {
  return (
    <div className='container'>
      <header>
        <h1 onClick={() => browserHistory.push('/')}>elo governor</h1>
      </header>
      {children}
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
// <ReactCSSTransitionGroup
//   component="div"
//   transitionName="example"
//   transitionEnterTimeout={500}
//   transitionLeaveTimeout={500}
// >
//   {React.cloneElement(this.props.children, {
//     key: this.props.location.pathname
//   })}
// </ReactCSSTransitionGroup>