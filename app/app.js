import React, { Component } from 'react'
import Routes from './router'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    var startClass = this.start ? ' actve' : '';
    var endClass = this.end ? ' end' : '';
    return (
      <div>
        <div className={`progress${startClass}${endClass}`}>
          <div className="rotate-loading"></div>
          <div className="progress-forward"></div>
        </div>
        <div className="go-top user-select-none" onClick={this._goTop}>
          <p>回</p>
          <p>顶</p>
          <p>部</p>
        </div>
        <Routes />
      </div>
    );
  }
}

export default App