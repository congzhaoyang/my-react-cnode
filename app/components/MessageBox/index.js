/* eslint-disable */
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import axios from 'axios'
import { message } from 'antd'
import API_CONFIG from '../../api'
import MessageItem from './MessageItem'

@inject(stores => stores)
class MessageBox extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {
        has_read_messages: [],
      }
    }
  }

  fetchMessages() {
    console.log(this.props.store.isLogin)
    let accesstoken = this.props.store.accessToken
    let mdrender = false
    if (this.props.store.isLogin) {
      axios.get(`${API_CONFIG.fetchMessages}?accesstoken=${accesstoken}&mdrender=${mdrender}`)
        .then(res => {
          console.log('消息盒子')
          console.log(res)
          if (res.data.success) {
            this.setState({
              data: res.data.data
            }, () => {
              console.log(this.state.data);

            })
          } else {
            message.info('获取消息失败')
          }
        })
        .catch(err => {
          console.error(err)
        })
    } else {
      message.info('请登录')
    }
  }

  componentDidMount() {
    this.fetchMessages()
  }

  render() {
    let { has_read_messages: hasReadMessages, hasnot_read_messages: hasnotReadMessages } = this.state.data
    console.log(this.state.data, hasReadMessages, hasnotReadMessages);

    // if (data.) 
    return (
      <div>
        <h3>未读消息</h3>
        {
          hasnotReadMessages && hasnotReadMessages.map((item, index) => {
            return (
              <MessageItem data={item} key={index}></MessageItem>
            )
          })
        }
        <h3>已读消息</h3>
        {
          hasReadMessages && hasReadMessages.map((item, index) => {
            return (
              <MessageItem data={item} key={index}></MessageItem>
            )
          })
        }
      </div>
    )
  }
}

export default MessageBox
