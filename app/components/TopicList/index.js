import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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

  render() {
    return (
      this.props.data.map((item, index) => {
        return (
          <li key={index} className="list-item">
            <div className="author">
              <div className="avatar-wrap">
                <img src={item.author.avatar_url} className="avatar" />
              </div>
              <span className="name">{item.author.loginname}</span>
            </div>
            <div className="content">
              <Link className="title" to={`/topic/${item.id}`}><h2>{item.title}</h2></Link>
              <div>
                {/* <span>1 小时前</span> */}
                <span>浏览: {item.visit_count}</span>
              </div>
            </div>
            <span className="reply-count">{item.reply_count}</span>
          </li>
        )
      })
    )
  }
}

export default TopicList

