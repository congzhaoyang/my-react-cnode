import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import './style.scss'

class TopicList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // data: [1, 2],
    }
  }

  componentDidUpdate() {

  }

  gotoPersonalPage(loginname, event) {
    // event.stopPropagation()
    let url = window.location.href + `user/${loginname}`
    console.log(url)
    event.preventDefault()
    console.log(1);
    window.location.href = url
    console.log(2);
  }

  render() {
    return (
      this.props.data.map((item, index) => {
        let replyCountClass = classNames({
          'reply-count': true,
          'disable': item.reply_count === 0
        })
        let loginname = item.author.loginname
        return (
          <Link to={`/topic/${item.id}`} key={index} >
            <li className="list-item" >
              <div className="author" onClick={this.gotoPersonalPage.bind(this, loginname)}>
                <div className="avatar-wrap">
                  <img src={item.author.avatar_url} className="avatar" />
                </div>
                <p className="name">{item.author.loginname}</p>
              </div>
              <div className="content">
                <h2>{item.title}</h2>
                <div>
                  {/* <span>1 小时前</span> */}
                  <span>浏览: {item.visit_count}</span>
                </div>
              </div>
              <span className={replyCountClass}>{item.reply_count}</span>
            </li >
          </Link >
        )
      })
    )
  }
}

export default TopicList

