import React, { Component } from 'react'
import { Select, Input } from 'antd'
import SimpleMDE from 'simplemde'
const Option = Select.Option

class Release extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      tab: 'dev',
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

  render() {
    return (
      <section className="release-page">
        <p>发新帖</p>
        {/* <span>选择板块</span>
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
          <Option value="分享">分享</Option>
          <Option value="回答">回答</Option>
          <Option value="招聘">招聘</Option>
          <Option value="客户端测试">客户端测试</Option>
        </Select>
        <Input placeholder="标题字数 10字以上" value={this.state.title} onChange={this.handleTitleChange} />
        <div className="editor">
          <textarea id="markdown-editor"></textarea>
          <div className="release-btn">
            <button onClick={this.releaseTopics}>{this.currentStatus ? '发布' : '更新'}</button>
          </div>
        </div> */}
      </section>
    )
  }
}

export default Release 