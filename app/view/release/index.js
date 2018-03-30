import React, { Component } from 'react'
import { Select, Input } from 'antd'
import axios from 'axios'
import { observer, inject } from 'mobx-react'
import SimpleMDE from 'simplemde'
import '../../../node_modules/simplemde/dist/simplemde.min.css'
const Option = Select.Option

@inject(stores => stores)
@observer class Release extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      tab: '',
    }
  }

  handleTitleChange = e => {
    this.setState({
      title: e.target.value.trim()
    })
  }

  handleTabChange = value => {
    this.setState({
      tab: value
    })
  }

  releaseTopics = () => {
    if (this.props.store.isLogin) {
      axios.post('https://cnodejs.org/api/v1/topics', {
        accesstoken: this.props.store.accessToken,
        title: this.state.title,
        tab: this.state.tab || 'dev',
        content: this.simplemde.value(),
      })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.error(err)
        })
    } else {
      alert('请登录')
    }
  }

  componentDidMount() {
    this.initMarkdownEditor()
  }

  initMarkdownEditor = () => {
    this.simplemde = new SimpleMDE({
      element: document.getElementById("markdown-editor"),
      spellChecker: false, 				// 启用拼写检查，会有背景色
      autoDownloadFontAwesome: false,		// 是否需要下载字体图标
    });
  }

  render() {
    return (
      <section className="release-page">
        <p>发新帖</p>
        <span>选择板块</span>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="请选择"
          optionFilterProp="children"
          onSelect={this.handleTabChange}
          value={this.state.tab}
        // onChange={handleChange}
        // onFocus={handleFocus}
        // onBlur={handleBlur}
        // filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          <Option value="share">分享</Option>
          <Option value="ask">回答</Option>
          <Option value="job">招聘</Option>
          <Option value="dev">客户端测试</Option>
        </Select>
        <Input placeholder="标题字数 10字以上" value={this.state.title} onChange={this.handleTitleChange} />
        <div className="editor">
          <textarea id="markdown-editor"></textarea>
          <div className="release-btn">
            <button onClick={this.releaseTopics}>{this.currentStatus ? '发布' : '更新'}</button>
          </div>
        </div>
      </section>
    )
  }
}

export default Release 