import React from "react";
import { withRouter } from "react-router-dom";
import './join_form.css';
class JoinForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      room_token: "",
      errors: {},
    };

    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.clearedErrors = false;
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.signedIn === true) {
  //     this.props.history.push("/rooms");
  //   }

  //   this.setState({ errors: nextProps.errors });
  // }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      username: this.state.username,
      room_token: this.state.room_token,
    };

    // let userLogin = {
    //   email: this.state.email,
    //   password: this.state.password
    // }

    // this.props.signup(user);
    // this.props.login(userLogin)
    //   .then(() => this.props.history.push("/home"));
  }

  // renderErrors() {
  //   return (
  //     <ul className="error-ul">
  //       {Object.keys(this.state.errors).map((error, i) => (
  //         <li className="error-li" key={`error-${i}`}>{this.state.errors[error]}</li>
  //       ))}
  //     </ul>
  //   );
  // }

  render() {
    return (
      <div className="join-container">
        <form onSubmit={this.handleSubmit}>
          <div className="join-form">
            <div className="form-title"><i className="fas fa-paint-brush"></i></div>
            {/* {this.renderErrors()} */}
            <br />
            <input
              className="form-input three"
              type="text"
              value={this.state.username}
              onChange={this.update("username")}
              placeholder="Username"
            />
            <br />
            <input
              className="form-input two"
              type="text"
              value={this.state.room_token}
              onChange={this.update("room_token")}
              placeholder="Room Token"
            />
            <br />
            <input className="form-button" type="submit" value="Join Room" />
            {/* <div className="redirect">
              <p className="redirect-link">{this.props.navLink}</p>
            </div> */}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(JoinForm);