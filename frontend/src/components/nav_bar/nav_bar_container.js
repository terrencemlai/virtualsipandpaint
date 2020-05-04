// import React from 'react'; login, signup
import { connect } from "react-redux";
import { logout, login } from "../../actions/session_actions";
import {newRoom, joinRoom} from "../../actions/room_actions";

import NavBar from "./nav_bar";

const mapStateToProps = (state) => ({
  room: state.entities.room,
  currentUser: state.session.user,
  loggedIn: state.session.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  login: (user) => dispatch(login(user)),
  logout: () => dispatch(logout()),
  newRoom: (userId) => dispatch(newRoom(userId)),
  joinRoom: roomToken => dispatch(joinRoom(roomToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
