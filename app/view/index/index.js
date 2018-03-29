import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import TopicList from '../../components/TopicList'
import { querystring } from '../../utils/queryString'
import axios from 'axios'
import { Pagination } from 'antd'
import './style.scss'

class Index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      topic: [],
      page: 1,
      total: 9999,
    }
  }

  fetchTopicData() {
    console.log(this.props.location)
    axios.get('https://cnodejs.org/api/v1/topics', {
      params: {
        limit: 40,
        tab: querystring(this.props.location.search).tab || 'all',
        page: this.state.page,
      }
    })
      .then(res => {
        if (res.data.success) {
          this.setState({
            topic: res.data.data
          })
        }
      })
  }

  changePage (page) {
    console.log(this)
    this.setState({
      page: page,
    }, () => {
      this.fetchTopicData()
    })
  }

  componentDidMount() {
    this.fetchTopicData()
  }

  componentDidUpdate (prevProps, prevState, prevContext) {
    if (this.props.location !== prevProps.location) {
      let page = parseInt(querystring(this.props.location.search).page)
      if (!page) {
        this.setState({
          page: 1,
        }, () => {
          this.fetchTopicData()
        })
        return
      }
      this.fetchTopicData()
    }
  }

  render() {
    return (
      <div className="page">
        <Link to="/release">发帖</Link>
        <Link to="/login">登录</Link>
        <nav className="nav">
          <NavLink to="/">全部</NavLink>
          <NavLink to="/?tab=good">精华</NavLink>
          <NavLink to="/?tab=share">分享</NavLink>
          <NavLink to="/?tab=ask">问答</NavLink>
          <NavLink to="/?tab=job">招聘</NavLink>
          <NavLink to="/?tab=dev">客户端测试</NavLink>
        </nav>
        <TopicList data={this.state.topic}></TopicList>
        <Pagination current={this.state.page} total={50} onChange={this.changePage.bind(this)} total={this.state.total} pageSize={40}/>
      </div>
    )
  }
}

export default Index