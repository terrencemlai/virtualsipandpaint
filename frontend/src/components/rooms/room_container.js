import { connect } from "react-redux";
import { saveArtwork } from "../../actions/artwork_actions";
import { getRoom } from "../../actions/room_actions";
import Room from './room';

const mapStateToProps = (state, ownProps) => ({
    currentUser: state.session.user,
    loggedIn: state.session.isAuthenticated,
    room: state.entities.room,
    roomId: ownProps.match.params.id,
})


const mapDispatchToProps = (dispatch) => ({
   saveArtwork: (data) => dispatch(saveArtwork(data)),
   getRoom: (roomId) => dispatch(getRoom(roomId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Room);