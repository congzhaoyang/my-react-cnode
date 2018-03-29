import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Pagination } from 'antd'
import axios from 'axios'
import ReplyItem from '../../components/ReplyItem'

class TopicPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {
        author: {
          avatar_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACAQMAAACnuvRZAAAAA1BMVEX29vYACyOqAAAACklEQVQI12MAAgAABAABINItbwAAAABJRU5ErkJggg==',
          loginname: '--',
        },
        author_id: '',
        content: '',
        create_at: Date.now(),
        good: false,
        id: '',
        is_collect: false,
        last_reply_at: Date.now(),
        replies: [],
        reply_count: 0,
        tab: '',
        title: '',
        top: false,
        visit_count: 0,
      }
    }
  }

  componentDidMount() {
    this.fetchTopicData()
  }

  fetchTopicData() {
    console.log(this.props.location)
    axios.get(`https://cnodejs.org/api/v1/${this.props.location.pathname}`, {
      // params: {
      //   limit: 40,
      //   tab: querystring(this.props.location.search).tab || 'all',
      //   page: this.state.page,
      // }
    })
      .then(res => {
        if (res.data.success) {
          this.setState({
            data: res.data.data
          }, () => {
            setTimeout(() => {

            }, 17);
          })
        }
      })
  }


  render () {
    let data = this.state.data

    return (
      <section className="topic-content">
        <span>topicPage</span>
        <h1>{data.title}</h1>
        <div className="author">
          <div className="avatar">
            <img src={data.author.avatar_url}/>
          </div>
          <span>{data.author.loginname}</span>
        </div>
        <div className="content" dangerouslySetInnerHTML={{ __html: data.content }} />
        {
          data.replies.map((item, index) => {
            return (
              <ReplyItem data={ item } index = { index } key={index}/>
            )
          })
        }
      </section>
    )
  }
}

export default TopicPage