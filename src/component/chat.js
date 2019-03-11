import React, { Component } from 'react';
import Render from "./render.js"
import io from "socket.io-client"
class Chat extends Component {
  constructor(props) {
    super(props);
    this.socket = io("http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000/");
    this.state = {
      myMessage: "",
      users: []
    }
    this.audio = new Audio("https://wow.zamimg.com/wowsounds/556000");
    this.message = this.message.bind(this);
    this.submit = this.submit.bind(this);
    this.logOut = this.logOut.bind(this);
    this.handleAllMessage = this.handleAllMessage.bind(this);
    this.handleNewMessage = this.handleNewMessage.bind(this);
  }
  componentDidMount() {
    console.log("did mount")
    this.socket.on('messages', this.handleAllMessage)
    this.socket.on('new_message', this.handleNewMessage)
  }

  handleAllMessage(data) {
    this.setState({ users: data })
    let container = document.querySelector(".chat-container");
    container.scrollTop = container.scrollHeight - container.clientHeight;
  }
  handleNewMessage(data) {
    this.setState({ users: [...this.state.users, data] });
    let container = document.querySelector(".chat-container");
    container.scrollTop = container.scrollHeight - container.clientHeight;
    this.audio.play();
  }
  componentWillUnmount() {
    console.log("Unmount!")
  }
  logOut() {
    this.props.onClick();
  }
  message(e) {
    this.setState({ myMessage: e.target.value });
    this.audio.currentTime = 0;
  }
  submit(e) {
    e.preventDefault();
    if (this.state.myMessage.length > 1 && this.state.myMessage.length < 200) {
      this.socket.emit('message', {
        username: this.props.username,
        content: this.state.myMessage
      }, (response => {
        this.handleNewMessage(response.data.newMessage)
      }));
    }
    this.setState({ myMessage: "" })
  }
  render() {
    this.socket.on('disconnect', function () {
      console.log('a user disconnect');
    });
    let allMessage = <Render message={this.state.myMessage} users={this.state.users} />

    return (
      <div className="body-container">
        <div className="body-chat">
          <header className="body-chat-header">
            <h2>FEU18: Raid Chat</h2>
            <p> Logged in as: <span className="blink">{this.props.username}</span></p>
            <button onClick={this.logOut}>Log out</button>
          </header>
          <div className="chat-container">
            {allMessage}
          </div>
          <div className="chat-textcontainer">
            <form onSubmit={this.submit}>
              <input className="chat-textfield" placeholder="Messege" value={this.state.myMessage} type="text" onChange={this.message} />
              <button className="chat-textcontainer-button">Send</button>
            </form>
          </div>

        </div>
      </div>
    );
  }
}
export default Chat;