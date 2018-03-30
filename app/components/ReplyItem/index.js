import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SimpleMDE from 'simplemde'
import './style.scss'

class ReplyItem extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    // this.initMarkdownEditor()
  }

  // 初始化markdown编辑器
  initMarkdownEditor = () => {
    this.simplemde = new SimpleMDE({
      element: document.getElementById("markdown-editor"),
      spellChecker: false, 				// 启用拼写检查，会有背景色
      autoDownloadFontAwesome: false,		// 是否需要下载字体图标
    });
  }

  render() {
    let data = this.props.data
    let index = this.props.index
    return (
      <section className="reply-content">
        <div className="author">
          <div className="avatar">
            <img src={data.author.avatar_url} />
          </div>
          <span>{data.author.loginname}</span>
          <span>{index + 1}楼</span>
        </div>
        <div className="content" dangerouslySetInnerHTML={{ __html: data.content }} />
      </section>
    )
  }
}

export default ReplyItem