/* eslint-disable */
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import API_CONFIG from '../../../api'
import { Link } from 'react-router-dom'

class MessageItem extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    let data = this.props.data
    // let personalPageLink = API_CONFIG.user + data.author.loginname
    return (
      <div>
        <Link to={'user/' + data.author.loginname}>{data.author.loginname}</Link>回复了你的话题<Link to={'topic/' + data.topic.id}>{data.topic.title}</Link>
      </div>
    )
  }
}

export default MessageItem
