/* eslint-disable */
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import MessageBox from '../../components/MessageBox'

class Message extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <section className="message">
        Message
        <MessageBox></MessageBox>
      </section>
    )
  }

}

export default Message