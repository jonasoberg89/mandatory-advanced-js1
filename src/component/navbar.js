import React, { Component } from 'react';
import Logo from "../logo/logo.png"
class Navbar extends Component {
    render() {
      return (
        <nav className="navbar" >
          <h1 className="navbar-text-first">Chat</h1>
          <img src={Logo} alt="Logo"></img>
          <h1 className="navbar-text-second">App</h1>
        </nav>
      );
    }
  }

  export default Navbar;