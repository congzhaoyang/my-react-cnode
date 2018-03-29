import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import axios from 'axios'
import { observer, inject } from 'mobx-react'
import WrappedNormalLoginForm from '../../components/LoginBar'

@inject(stores => stores)
class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      accessToken: window.localStorage.access_token || '',
    }
  }

  handleChange(e) {
    console.log(e)
    this.setState({
      accessToken: e.target.value.trim()
    })
  }

  handleSubmit() {
    console.log(this.state.accessToken)
    axios.post('https://cnodejs.org/api/v1/accesstoken', {
      accesstoken: this.state.accessToken
    })
      .then((res) => {
        console.log(res)
        if (res.data.success) {
          console.log('登录成功')
          this.props.store.Login(this.state.accessToken, res.data)
          this.props.history.replace('/')
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  componentDiMount() {

  }

  render() {
    return (
      <section>
        <span>登录</span>
        <WrappedNormalLoginForm handleChange={this.handleChange.bind(this)} handleSubmit={this.handleSubmit.bind(this)}></WrappedNormalLoginForm>
      </section>
    )
  }
}

export default Login