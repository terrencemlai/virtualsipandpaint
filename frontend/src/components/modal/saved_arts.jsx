import React from 'react';
import SavedArtItem from "./saved_art_item";
import Footer from '../footer/footer';

class SavedArts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            retrieved: false
        }
    }

    componentDidMount() {
        this.props.retrieveArtworks(this.props.currentUser.id).then(() => {
            this.setState({
                retrieved: true
            })
        })
    }

    render() {
        if (this.state.retrieved === false) return null

        const savedArtLis = this.props.artworks.map((savedArt) => {
            return (
                <SavedArtItem
                    key={savedArt._id}
                    currentUser={this.props.currentUser}
                    savedArt={savedArt}
                />
            )
        });

        return (
            <>
                <div className="art-container">
                    <h1 className="user-saved-header">{this.props.currentUser.username}! These are your saved artworks!</h1>
                <main className="user-saved-arts">
                    <ul className="saved-arts-ul">
                        {savedArtLis}
                    </ul>
                </main>
                </div>
                <Footer />

            </>
        );
    }
};

export default SavedArts;