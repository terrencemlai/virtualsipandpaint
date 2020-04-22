import { connect } from "react-redux";
import Room from './room';
import { withRouter } from 'react-router-dom';

const mstp = (state,ownProps) => {
    return {
    }
}

const mdtp = (dispatch) => {
   
}

export default withRouter(connect(mstp,mdtp)(Room));