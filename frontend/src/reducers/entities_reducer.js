import { combineReducers } from "redux";
import roomsReducer from './rooms_reducer';
import artworksReducer from './artworks_reducer';


export default combineReducers({
  room: roomsReducer,
  artworks: artworksReducer,
});
