import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import NavBarContainer from './nav_bar/nav_bar_container';
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/sign_up_form_container";
import JoinFormContainer from './rooms/join_form_container';
import SplashPage from './splash/splash';
import RoomContainer from './rooms/room_container';
import ArtContainer from './modal/art_container'
const App = () => (
  <>
    <NavBarContainer />
    <Switch>
      <AuthRoute exact path="/" component={SplashPage} />
      <AuthRoute exact path="/splash" component={SplashPage} />
      <Route exact path="/join" component={JoinFormContainer}/>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/register" component={SignupFormContainer} />

      <ProtectedRoute exact path="/home" component={ArtContainer} />
      <Route path="/rooms/:id" component={RoomContainer}/>
    </Switch>
  </>
);

export default App;