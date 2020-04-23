import { RECEIVE_ARTWORKS } from "../actions/artwork_actions";
  
  // room obj id, host id, room token
  export default function (state = {}, action) {
    switch (action.type) {
      case RECEIVE_ARTWORKS:
        return action.artworks.data;
      default:
        return state;
    }
  }
  