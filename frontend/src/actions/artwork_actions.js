import {fetchArtworks, createArtwork} from "../util/artwork_util";

export const RECEIVE_ARTWORKS = "RECEIVE_ARTWORKS";
export const RECEIVE_ARTWORK = "RECEIVE_ARTWORK";
export const RECEIVE_ARTWORK_ERRORS = "RECEIVE_ARTWORK_ERRORS";


export const receiveArtworks = (artworks) => {
  return (
  {
  type: RECEIVE_ARTWORKS,
  artworks
})};

export const receiveArtworkErrors = errors => ({
  type: RECEIVE_ARTWORK_ERRORS,
  errors
});



export const saveArtwork = data => dispatch => (
  createArtwork(data)
  .then(res => dispatch(receiveArtworks(res)))
  .catch(err => dispatch(receiveArtworkErrors(err.response.data)))
);

export const retrieveArtworks = userId => dispatch => (
  fetchArtworks(userId)
  .then(res => dispatch(receiveArtworks(res)))
  .catch(err => dispatch(receiveArtworkErrors(err.response.data)))
);

