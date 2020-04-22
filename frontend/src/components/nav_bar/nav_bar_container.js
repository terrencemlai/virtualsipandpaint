// import React from 'react'; login, signup
import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import {newRoom} from "../../actions/room_actions";

import NavBar from "./nav_bar";

const mapStateToProps = (state) => ({
  currentUser: state.session.user,
  loggedIn: state.session.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  newRoom: (userId) => dispatch(newRoom(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
