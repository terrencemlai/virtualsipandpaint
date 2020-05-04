import React from "react";
import "./session_form.css";
import { withRouter } from "react-router-dom";
import Footer from "../footer/footer";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }


  update(type) {
    return (e) =>
      this.setState({
        [type]: e.currentTarget.value,
      });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push('/home');
    }

    this.setState({errors: nextProps.errors});
  }

  // componentDidMount() {

  // }

  handleSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.login(user);
      // .then(() => this.props.history.push("/home"));
  }

  renderErrors() {
    return (
      <ul className="error-ul">
        {Object.keys(this.state.errors).map((error, i) => (
          <li className="error-li" key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <>
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          <div className="login-form">
            <div className="form-title"><img src="tipsylogo.png" alt="" height="100" width="100"></img></div>
            {this.renderErrors()}
            <br />
            <input
              className="form-input one"
              type="text"
              value={this.state.email}
              onChange={this.update("email")}
              placeholder="Email"
            />
            <br />
            <input
              className="form-input two"
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
              placeholder="Password"
            />
            <br />
            <input className="form-button" type="submit" value="Log In" />
            <div className="redirect">
              Don't have an account?{" "}
              <p className="redirect-link">&nbsp;{this.props.navLink}</p>
            </div>
          </div>
        </form>
      </div>
      <Footer />
      </>
    );
  }
}

export default withRouter(LoginForm);
