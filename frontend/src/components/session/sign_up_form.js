import React from "react";
import { withRouter } from "react-router-dom";
import Footer from "../footer/footer";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      password2: "",
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push("/home");
    }

    this.setState({ errors: nextProps.errors });
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    // let user = {
    //   email: this.state.email,
    //   username: this.state.username,
    //   password: this.state.password,
    //   password2: this.state.password2
    // };

    // let userLogin = {
    //   email: this.state.email,
    //   password: this.state.password
    // }

    this.props.signup(this.state);
    // this.props.login(userLogin)
    //   .then(() => this.props.history.push("/home"));
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
          <div className="signup-form">
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
              type="text"
              value={this.state.handle}
              onChange={this.update("username")}
              placeholder="Username"
            />
            <br />
            <input
              className="form-input three"
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
              placeholder="Password"
            />
            <br />
            <input
              className="form-input four"
              type="password"
              value={this.state.password2}
              onChange={this.update("password2")}
              placeholder="Confirm Password"
            />
            <br />
            <input className="form-button" type="submit" value="Sign Up" />
            <div className="redirect">
              Already signed up?
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

export default withRouter(SignupForm);
