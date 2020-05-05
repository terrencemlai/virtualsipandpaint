import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./nav_bar.css";


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.getLinks = this.getLinks.bind(this);
    this.getNavLink = this.getNavLink.bind(this);
    this.handleCreateRoom = this.handleCreateRoom.bind(this);
    this.handleDemoLogin = this.handleDemoLogin.bind(this);
  }

  handleDemoLogin(e) {
    e.preventDefault();
    const user = { email: "tipsypainter@email.com", password: "password" }
    this.props.login(user);
  };

  handleCreateRoom(){
    this.props.newRoom({userId: this.props.currentUser.id})
      .then(() => this.props.history.push(`/rooms/${this.props.room._id}`));
  }


  getLinks() {
    const welcome = ["Welcome to tipsy painting,", "Welcome tipsy painter,", "Ready. Set. Sip and paint,"];
    const welcomeMsg = welcome[Math.floor(Math.random() * welcome.length)]

    if (window.location.href.includes("rooms") && this.props.loggedIn) {
      return (
        <div className="greeting-logout">
          <div className='user-greet' >{welcomeMsg} {this.props.currentUser.username}!</div>
          <button className="logout" onClick={this.props.logout}>Log Out</button>
        </div>
      );
    }
    else if (this.props.loggedIn) {
      return (
        <div className="greeting-logout">
          <div className='user-greet' >{welcomeMsg} {this.props.currentUser.username}!</div>
          <div className='join'>
            <button className="join-room" onClick={this.handleCreateRoom}><i className="fas fa-plus"></i> New Room</button>
            <Link className="join-room" to={"/join"}> <i className="fas fa-door-open"></i>  Join Room</Link>
          </div>
          <button className="logout" onClick={this.props.logout}>Log Out</button>
        </div>
      );
    } else if (window.location.href.includes("rooms")) {
      return (
        <div className="session-links">
          <Link className="sign-up" to={"/register"}>
            Sign Up
         </Link>
          <Link className="login" to={"/login"}>
            Log In
         </Link>
        </div>
      );
    } else {
      return (
        <div className="session-links">
          <div className='right-divide'>
            <Link className="join-room" to={"/join"}> <i className="fas fa-door-open"></i> Join Room</Link>
          </div>
          <button className="login" onClick={this.handleDemoLogin}>
            Demo Log In
         </button>
          <Link className="sign-up" to={"/register"}>
            Sign Up
         </Link>
          <Link className="login" to={"/login"}>
            Log In
         </Link>
        </div>
      );
    }
  }

  getNavLink(){
    if (this.props.loggedIn) {
      return(
      <Link className='nav-link' to={"/home"}>
        <h1 className='app-title'><img src="tipsylogo.png" alt="" height="80" width="80"></img>Tipsy Painter </h1>
      </Link>
      );
      
    } else {
      return(
      <Link className='nav-link' to={"/splash"}> 
        <h1 className='app-title'><img src="tipsylogo.png" alt="" height="80" width="80"></img>Tipsy Painter </h1>
      </Link>
      );
    }
  }

  render() {
    return (
      <div className='nav-bar'> 
        <div className='nav-beauty'>
          {/* <Link className='nav-link' to={"/splash"}>
            <h1 className='app-title'>Tipsy Painter <i className="fas fa-paint-brush"></i></h1>
          </Link> */}
          {this.getNavLink()}
          {this.getLinks()}
        </div>
      </div>
    );
  }
}
//Tipsy Painter <i className="fas fa-paint-brush"></i>
export default withRouter(NavBar);
