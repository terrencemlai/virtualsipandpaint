import React from 'react';
import './splash.css';

class SplashPage extends React.Component {
  render () {
       return (
         <div className="splash">
         <div className="splash-container">
           <h1 className="welcome">Welcome to Tipsy Painter!</h1>
            <h2 className="header2">What is Tipsy Painter?</h2>
           <h3 className="explanation" >
             <ul>
             <li className="first-paragraph">
                 Tipsy Painter is a collaborative drawing website
                 where you can create a drawing together with your freinds and family in your browser and get tipsy together.
             </li>
               </ul>
             </h3>
             <h2 className="header2">How to Use Tipsy Painter</h2>
             <div className="header2-container">
             <h3 className="explanation" >
               <div className="list-container">
                   <div className="list-left"> 
                   <ol>
                     <li> Create your account.</li>
                     <img className="gif" src="create_account.gif" alt="create account" />
                     <li> Get your bottle of wine.</li>
                       <img className="gif" src="wine.gif" alt="wine" />
                     </ol>

                   </div>
                   <ol start="3">
                   <div className="list-right">
                     <li> Create a room to create a painting together.</li>
                     <li>If you already have a room to join, then click "Join Room"</li>
                       <img className="gif" src="join_room.gif" alt="join_room" />
                     <li> Share your invite link to your friends or family.</li>
                     <li> Enjoy creating a painting together.</li>
                       <img className="gif" src="painttogether.gif" alt="painttogether" />
                   </div>
                   </ol>
               </div>
           </h3>
             </div>
         </div>
         </div>
       )
  }
}

export default SplashPage;