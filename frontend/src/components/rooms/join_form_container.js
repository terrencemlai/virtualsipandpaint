import { connect } from "react-redux";
import { joinRoom } from "../../actions/room_actions";
import JoinForm from "./join_form";

const mapStateToProps = (state) => {
  return {
    room: state.entities.room,
    errors: state.errors.room,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    joinRoom: (roomToken) => dispatch(joinRoom(roomToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinForm);