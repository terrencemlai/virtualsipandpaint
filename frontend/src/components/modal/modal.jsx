// import React from 'react';
// import { closeModal } from '../../actions/modal_actions';
// import { connect } from 'react-redux';
// import ShowImage from './image'
// import './modal.css';

// class Modal extends React.Component {
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         let component;

//         if(!this.props.payload) {
//             return null;
//         }

//         const { modal, data_url } = this.props.payload;

//         switch (modal) {
//             case 'art':
//                 component = <ShowImage data_url={data_url}/>
//                 break;
//             default:
//                 component = null;
//         }

//         return (
//             <div className="modal-background" onClick={this.props.closeModal}>
//                 <div className="modal-close" onClick={this.props.closeModal}>&times;</div>
//                 <div className="modal-child" onClick={e => e.stopPropagation()}>
//                     {component}
//                 </div>
//             </div>
//         )
//     }

// }

// const mstp = state => {
//     return {
//         payload: state.ui.modal
//     };
// };

// const mdtp = dispatch => {
//     return {
//         closeModal: () => dispatch(closeModal())
//     };
// };

// export default connect(mstp, mdtp)(Modal);