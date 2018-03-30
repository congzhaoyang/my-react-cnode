import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Pagination } from 'antd'
import axios from 'axios'
import { observer, inject } from 'mobx-react'
import SimpleMDE from 'simplemde'
import API_CONFIG from '../../api'
import '../../../node_modules/simplemde/dist/simplemde.min.css'
import ReplyItem from '../../components/ReplyItem'

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
          if(res.data.success) {
            alert('回复成功')
          }
        })
        .catch(err => {
          console.error(err)
        })
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
            <button type="button" onClick={this.insertReply}>{this.insertBtnText}回帖</button>
          </div>
        </div>
      </section>
    )
  }
}

export default TopicPage