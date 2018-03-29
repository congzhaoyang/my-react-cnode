import { observable, action } from 'mobx'
import axios from 'axios'
import API_CONFIG from '../api'

// @observable: 观测谁
class Store {
  @observable accessToken = window.localStorage.access_token || ''
  @observable isLogin = false
  @observable userInfo = {
    avatar_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACAQMAAACnuvRZAAAAA1BMVEX29vYACyOqAAAACklEQVQI12MAAgAABAABINItbwAAAABJRU5ErkJggg==',
    id: '',
    loginname: ''
  }
  @observable messageCount = 0

  // @actions: 改变状态的动作
  @action login(accessToken, userInfo) {
    window.localStorage.setItem('access_token', accessToken)
    console.log(this.accessToken)
    this.userInfo = userInfo
    this.isLogin = true
    this.fetchMessageCount()
  }

  @action logout() {
    window.localStorage.removeItem('access_token')
    this.accessToken = ''
    this.isLogin = false
  }

  @action fetchMessageCount() {
    console.log(this.accessToken);

    axios.get(`${API_CONFIG.messageCount}?accesstoken=${this.accessToken}`)
      .then(res => {
        console.log(res)
        console.log(this.accessToken)
      })
      .catch(err => {
        console.error(err)
      })
  }

  // @action fetchMessageCount() {
  //   axios.get(API_CONFIG.messageCount)
  //     .then(res => {
  //       if (res.data.success) {
  //         this.messageCount = res.data.data;
  //       }
  //     })
  //     .catch(e => e);
  // }
}

export default Store