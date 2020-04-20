import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div>
          <div>Welcome {this.props.currentUser.username}!<div/>
          <button onClick={this.logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div>
          <Link to={"/signup"}>Sign Up</Link>
          <Link to={"/login"}>Log In</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h1>Virtual Sip and Paint</h1>
        {this.getLinks()}
      </div>
    );
  }
}

export default NavBar;
