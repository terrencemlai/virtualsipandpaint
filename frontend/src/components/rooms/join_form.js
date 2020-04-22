import React from "react";
import { withRouter } from "react-router-dom";
import './join_form.css';
class JoinForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room_token: "",
      errors: {},
    };
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.signedIn === true) {
  //     this.props.history.push("/rooms");
  //   }

  //   this.setState({ errors: nextProps.errors });
  // }

  update(field) {
    // debugger
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    // debugger
    console.log({room_token: this.state.room_token});
    this.props.joinRoom({room_token: this.state.room_token})
      .then(() => this.props.history.push(`/rooms/${this.props.room._id}`));
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
      <div className="join-container">
        <form onSubmit={this.handleSubmit}>
          <div className="join-form">
            <div className="form-title"><i className="fas fa-paint-brush"></i></div>
            {this.renderErrors()}
            <input
              className="form-input four"
              type="text"
              value={this.state.room_token}
              onChange={this.update("room_token")}
              placeholder="Room Token"
            />
            <br />
            <input className="form-button" type="submit" value="Join Room" />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(JoinForm);