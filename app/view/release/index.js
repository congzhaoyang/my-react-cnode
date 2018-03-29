import React, { Component } from 'react'
import { Select, Input } from 'antd'
import SimpleMDE from 'simplemde'
const Option = Select.Option

class Release extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  initMarkdownEditor = () => {
    this.simplemde = new SimpleMDE({
      element: document.getElementById("markdown-editor"),
      spellChecker: false, 				// 启用拼写检查，会有背景色
      autoDownloadFontAwesome: false,		// 是否需要下载字体图标
    });
  }

  componentDidMount () {
    this.initMarkdownEditor()
  }

  render() {
    return (
      <section className="release-page">
        <span>选择板块</span>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="请选择"
          optionFilterProp="children"
          // onChange={handleChange}
          // onFocus={handleFocus}
          // onBlur={handleBlur}
          // filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          <Option value="分享">分享</Option>
          <Option value="回答">回答</Option>
          <Option value="招聘">招聘</Option>
          <Option value="客户端测试">客户端测试</Option>
        </Select>
        <Input placeholder="标题字数 10字以上" />
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