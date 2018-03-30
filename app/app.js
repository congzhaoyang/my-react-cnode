import React, { Component } from 'react'
import Routes from './router'
import { observer, inject } from 'mobx-react'

@inject(stores => stores)
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.store.checkLogin()
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
        <Routes />
      </div>
    );
  }
}

export default App