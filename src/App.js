import React, {Component} from 'react'
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from "react-router-dom";
import CreateMarkerContainer from './Containers/CreateMarkerContainer';
import CreateTripContainer from './Containers/CreateTripContainer';
import LoginContainer from './Containers/LoginContainer';
import MainMapContainer from './Containers/MainMapContainer';
import MyTripsContainer from './Containers/MyTripsContainer';
import SuggestedTripsContainer from './Containers/SuggestedTripsContainer';
import TripContainer from './Containers/TripContainer';

class App extends Component{

  constructor() {
    super()

  }

  render() {
    return(
      <Router>
        <div>
          <Route exact path="/createmarker"
            render={(routerProps) => <CreateMarkerContainer/>}/>

          <Route exact path="/createtrip"
            render={(routerProps) => <CreateTripContainer/>}/>

          <Route exact path="/"
            render={(routerProps) => <LoginContainer/>}/>

          <Route exact path="/Mainmap"
            render={(routerProps) => <MainMapContainer/>}/>

          <Route exact path="/mytrips"
            render={(routerProps) => <MyTripsContainer/>}/>

          <Route exact path="/suggestedtrips"
            render={(routerProps) => <SuggestedTripsContainer/>}/>

          <Route exact path="/tripdetails"
            render={(routerProps) => <TripContainer/>}/>
        </div>
      </Router>
    )
  }
}

export default App;
