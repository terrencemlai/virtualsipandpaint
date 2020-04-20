import { connect } from "react-redux";
import { login, signup, logout } from "../../actions/session_actions";

import NavBar from "./navbar";

const mapStateToProps = (state) => ({
  currentUser: state.session.user,
  loggedIn: state.session.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(NavBar);
