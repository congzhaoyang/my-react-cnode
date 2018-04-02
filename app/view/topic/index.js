import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Pagination, Button, Radio, Icon, message } from 'antd'
import axios from 'axios'
import { observer, inject } from 'mobx-react'
import SimpleMDE from 'simplemde'
import API_CONFIG from '../../api'
import '../../../node_modules/simplemde/dist/simplemde.min.css'
import ReplyItem from '../../components/ReplyItem'
import './style.scss'

@inject(stores => stores)
@observer class TopicPage extends Component {
  constructor(props) {
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
    this.initMarkdownEditor();
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
          console.log(res.data)
          this.setState({
            data: res.data.data
          }, () => {
            setTimeout(() => {

            }, 17);
          })
        }
      })
  }

  // 初始化markdown编辑器
  initMarkdownEditor = () => {
    this.simplemde = new SimpleMDE({
      element: document.getElementById("markdown-editor"),
      spellChecker: false, 				// 启用拼写检查，会有背景色
      autoDownloadFontAwesome: false,		// 是否需要下载字体图标
    });
  }

  insertReply = () => {
    if (this.props.store.isLogin) {
      axios.post(`https://cnodejs.org/api/v1/topic/${this.state.data.id}/replies`, {
        accesstoken: this.props.store.accessToken,
        content: this.simplemde.value(),
        reply_id: ''
      })
        .then(res => {
          console.log(res)
          if (res.data.success) {
            this.fetchTopicData()
            alert('回复成功')
          }
        })
        .catch(err => {
          console.error(err)
        })
    }
  }

  handleCollect = () => {
    if (this.props.store.isLogin) {
      console.log(this.state.data.is_collect)
      if (!this.state.data.is_collect) { // 未被收藏的帖子
        console.log('走未被收藏');
        axios.post(API_CONFIG.collection, {
          accesstoken: this.props.store.accessToken,
          topic_id: this.state.data.id,
        })
          .then(res => {
            console.log(res)
            if (res.data.success) {
              message.info('收藏成功')
              // this.setState({
              //   data: {
              //     is_collect: true,
              //   }
              // })
              let data = Object.assign({}, this.state.data, { is_collect: true })
              this.setState({
                data: data
              })
            } else {
              message.info('收藏失败')
            }
          })
          .catch(err => {
            console.error(err)
          })
      } else { // 已被收藏的帖子
        console.log('走已收藏');
        axios.post(API_CONFIG.cancelCollection, {
          accesstoken: this.props.store.accessToken,
          topic_id: this.state.data.id,
        })
          .then(res => {
            console.log(res)
            if (res.data.success) {
              message.info('取消收藏成功')
              // this.setState({
              //   data: {
              //     is_collect: false,
              //   }
              //   // data[is_collect] = false
              // })
              // this.setState(Object.assign({}, this.state.data, { is_collect: false }))
              let data = Object.assign({}, this.state.data, { is_collect: false })
              this.setState({
                data: data
              })
            } else {
              message.info('取消收藏失败')
            }
          })
          .catch(err => {
            console.error(err)
          })
      }
    } else {
      message.info('请登录')
    }
  }

  render() {
    let data = this.state.data

    return (
      <section className="topic-content">
        <span>topicPage</span>
        <h1>{data.title}</h1>
        <div className="author">
          <div className="avatar">
            <img src={data.author.avatar_url} />
          </div>
          <span>{data.author.loginname}</span>
        </div>
        <div className="content" dangerouslySetInnerHTML={{ __html: data.content }} />
        <Button type="primary" onClick={this.handleCollect}>{data.is_collect ? '取消收藏' : '收藏'}</Button>
        {
          data.replies.map((item, index) => {
            return (
              <ReplyItem data={item} index={index} key={index} />
            )
          })
        }
        <div className="insert-reply" style={{ display: !this.props.store.isLogin ? 'none' : '' }}>
          <div className="tip">添加回复</div>
          <textarea id="markdown-editor"></textarea>
          <div className="reply-btn">
            {/* <button type="button" onClick={this.insertReply}>{this.insertBtnText}回帖</button> */}
            <Button type="primary" onClick={this.insertReply}>{this.insertBtnText}回帖</Button>
          </div>
        </div>
      </section>
    )
  }
}

export default TopicPage