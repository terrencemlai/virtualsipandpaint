import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { login } from "../../actions/session_actions";
import LoginForm from "./login_form";

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
    navLink: <Link className="navlink" to="/register">Sign Up</Link>,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
