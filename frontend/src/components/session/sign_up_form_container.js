import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signup, login } from "../../actions/session_actions";
import SignupForm from "./sign_up_form";

const mapStateToProps = (state) => {
  return {
    signedIn: state.session.isSignedIn,
    errors: state.errors.session,
    navLink: <Link className="navlink" to="/login">Log In</Link>,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (user) => dispatch(signup(user)),
    login: (user) => dispatch(login(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
