import React from 'react'
import { HashRouter as Router, Switch, Route, Lifecycle } from 'react-router-dom'
import HomePage from '../view/index'
import TopicPage from '../view/topic'
import Release from '../view/release'
import Login from '../view/login'
import { observer, inject } from 'mobx-react'

// @inject(stores => stores)
const Routes = () => {

  return (
    <Router>
      <div className="router-view">
        {/* <Header /> */}
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/topic/:id" component={TopicPage} />
          <Route path="/release" component={Release} />
          <Route path="/login" component={Login} />
          {/* <Route path="/login" component={Login} />
          <Route path="/topic/:id" component={Topic} />
          <Route path="/messages/" component={Messages} />
          <Route path="/Release/:id" component={Release} />
          <Route path="/user/:loginname" exact component={User} />
          <Route path="/user/:loginname/collections" component={Collections} />
          <Route component={NotMatch} /> */}
        </Switch>
        {/* <Footer /> */}
      </div>
    </Router>
  )
};

export default Routes;