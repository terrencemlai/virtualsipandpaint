// import React from 'react';

// class ShowImage extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             retrieve = false
//         }
//     }

//     componentDidMount() {
//         this.props.retrieveArtworks(this.props.currentUser.id).then(() => {
//             this.setState({
//                 retrieved: true
//             })
//         })
//     }

//     render() {
//         const { data_url } = this.props
//         return (
//             <img src={data_url} />
//         )
//     }
// }