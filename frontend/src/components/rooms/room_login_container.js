import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { login } from "../../actions/session_actions";
import RoomLoginForm from "./room_login";

const mapStateToProps = (state) => {
    return {
        errors: state.errors.session,
        navLink: <Link to="/register">Sign Up</Link>,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => dispatch(login(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomLoginForm);
