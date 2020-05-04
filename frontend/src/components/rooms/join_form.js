import React from "react";
import { withRouter } from "react-router-dom";
import './join_form.css';
import Footer from "../footer/footer";
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

  componentDidMount() {
    let queryParams = new URLSearchParams(this.props.location.search)
    let roomtoken = queryParams.get("roomtoken")
    if (roomtoken) {
      return this.setState({ room_token: roomtoken })
    }
  }


  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.joinRoom(this.state.room_token)
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
      <>
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
      <Footer /> 
      </>
    );
  }
}

export default withRouter(JoinForm);