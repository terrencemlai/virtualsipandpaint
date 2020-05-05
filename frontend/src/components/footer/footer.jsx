import React from "react";
import "./footer.css";


class Footer extends React.Component {

    render() {
        return (
            <div className="footer">
                <div className='footer-beauty'>
                    <div className="created-by">Created by</div>
                    <div className="personal-links">
                        <a className="personal-link" target="_blank" rel="noopener noreferrer" href="https://github.com/danjlee">Dan Lee</a>
                        <a className="personal-link" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/jaesong2/">Jae Song</a>
                        <a className="personal-link" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/satomiokada/">Satomi Okada</a>
                        <a className="personal-link" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/terrencelai/">Terrence Lai</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
