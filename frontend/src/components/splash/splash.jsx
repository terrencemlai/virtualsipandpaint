import React from 'react';
import './splash.css';
import Footer from '../footer/footer';

class SplashPage extends React.Component {
  render() {
    return (
      <div className="splash">
        <div className="splash-container">
          <h1 className="welcome">Welcome to Tipsy Painter!</h1>
          <h2 className="header2">What is Tipsy Painter?</h2>
            <ul>
              <li className="first-paragraph">
                Tipsy Painter is a collaborative drawing website
                where you can draw with freinds and get tipsy together.
             </li>
            </ul>
          <h2 className="header2">How to Use Tipsy Painter</h2>
          <div className="header2-container">
              <div className="list-container">
                <div className="list-left">
                  <ol>
                    <div className="step">
                    <li className="list-splash"> Create your account.</li>
                <i><img src="create_account.gif" className="circular-square" alt="create_account"/></i>
                </div>
                    <div className="step">
                  <li className="list-splash"> Create a painting room.</li>
                <i><img src="create_room.gif" className="circular-square" alt="create_room" /></i>
                   </div>
                </ol>
                </div> 
                <div className="list-right">
                  <ol start="3">
                  <div className="step">
                <li className="list-splash"> Share your invite link with friends.</li>
                <i><img src="invite.gif" className="circular-square" alt="invite" /></i>
                  </div>
                <div className="step">
                <li className="list-splash"> Grab your wine and start painting!</li>
                <i><img src="wine.gif" className="circular-square" alt="wine" /></i>
                </div>
                </ol>
                </div>
              </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default SplashPage;