import React from 'react';
import './saved_artwork.css';


const SavedArtItem = ({ savedArt }) => {

    return ( 
        <li className="saved-art-info">
            <img src={savedArt.data_url} />
        </li>
    );
};

export default SavedArtItem;