import { observable, action } from 'mobx'
import API_CONFIG from '../api'

// @observable: 观测谁
class Store {
  @observable accessToken = window.localStorage.access_token || ''
  @observable isLogin = false
  @observable userInfo = {
    avatar_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACAQMAAACnuvRZAAAAA1BMVEX29vYACyOqAAAACklEQVQI12MAAgAABAABINItbwAAAABJRU5ErkJggg==',
    id: '',
    loginname: ''
  },
  @observable messageCount = 0,

  // @actions: 改变状态的动作
  @action login (accessToken, userInfo) {
    window.localStorage.setItem('access_token', accessToken)
    this.userInfo = userInfo
    this.isLogin = true
  }
}