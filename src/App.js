import React, { Component } from 'react';
import './App.css';
import Navbar from "./component/navbar"
import Login from "./component/login";
import Chat from "./component/chat"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      loggedIn: "",
      page: "login"
    }
    this.regExLogin = /^[a-zåäöA-ZÅÄÖ\d-_\s]*$/;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }
  onChange(e) {
    this.setState({ username: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    if (!this.regExLogin.test(this.state.username)||this.state.username.length < 1 || this.state.username.length > 12) return;
    else { this.setState({ page: 'chat' }) }
  }
  onLogout() {
    this.setState({ page: "login", username: "" });
  }

  render() {
    const loginpage = <Login username={this.state.username} onChange={this.onChange} onLogin={this.onLogin} onSubmit={this.onSubmit} />;
    const chatpage = <Chat username={this.state.username} onClick={this.onLogout}></Chat>;
    if (this.state.page === 'login') {
      return (
        <div className="App">
          <Navbar />
          {loginpage}
        </div>
      )
    }
    else if (this.state.page === 'chat') {
      return (
        <div className='App'>
          {chatpage}
        </div>
      )
    }
  }
}
export default App;
