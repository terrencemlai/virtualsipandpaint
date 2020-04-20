import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './nav_bar/nav_bar_container';
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/sign_up_form_container";
const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      {/* <AuthRoute exact path="/splash" component={Splash} /> */}
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />

      {/* <ProtectedRoute exact path="/home" component={HomePageContainer} /> */}
    </Switch>
  </div>
);

export default App;