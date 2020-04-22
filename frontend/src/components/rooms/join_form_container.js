import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { login, signup } from "../../actions/session_actions";
import JoinForm from "./join_form";

// const mapStateToProps = (state) => {
//   return {
//     errors: state.errors.session,
//     navLink: <Link to="/register">Sign Up</Link>,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     login: (user) => dispatch(login(user)),
//   };
// };

export default connect(null, null)(JoinForm);