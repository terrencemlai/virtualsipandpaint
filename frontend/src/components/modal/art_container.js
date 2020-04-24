import { connect } from 'react-redux';
import { retrieveArtworks } from "../../actions/artwork_actions";
import { openModal } from "../../actions/modal_actions";
import SavedArts from "./saved_arts";

const mstp = (state) => {
    return {
        currentUser: state.session.user,
        artworks: state.entities.artworks
    }
}


const mdtp = dispatch => {
    return {
        retrieveArtworks: userId => dispatch(retrieveArtworks(userId)),
        openModal: modal => dispatch(openModal(modal))
    }
}

export default connect(mstp, mdtp)(SavedArts);