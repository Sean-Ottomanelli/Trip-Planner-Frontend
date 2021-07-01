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
    this.state = {
      userid:"",
      trips:[],
      markers: []
    }
  }

  getUserData = () => {
    fetch("http://localhost:3000/getuser",
    {headers:{
      "Authorization":`Bearer ${localStorage.token}`
    }})
    .then((r) => r.json())
    .then((user) => {
      this.setState({
        userId: user.id,
        trips: user.trips,
        markers: user.markers
      })
    })
  }

  logoutHandler = () => {
    localStorage.clear()
    window.location.reload()
  }

  getMarkers = (user) => {
    console.log(user)
  }

  setUserId = (id) => {
    console.log("set user",id)
  }

  componentDidMount(){
    if (localStorage.token) {
      this.getUserData()
    } 
  }

  render() {
    return(
      <div>
        <button onClick = {this.logoutHandler}>logout</button>
        <Router>

          <ul>
            <li>
              <Link to="/">main map</Link>
            </li>
            <li>
              <Link to="createmarker">create marker</Link>
            </li>
            <li>
              <Link to="createtrip">create trip</Link>
            </li>
            <li>
              <Link to="mytrips">my trips</Link>
            </li>
            <li>
              <Link to="suggestedtrips">suggested trips</Link>
            </li>
            <li>
              <Link to="tripdetails">trip details</Link>
            </li>
          </ul>


          <Switch>
            <Route path="/createmarker"
              render={(routerProps) => localStorage.token 
              ? <CreateMarkerContainer/> 
              : null}/>

            <Route path="/createtrip"
              render={(routerProps) => localStorage.token 
              ? <CreateTripContainer/> 
              : null}/>

            <Route exact path="/"
              render={(routerProps) => localStorage.token 
              ? <MainMapContainer  
              markers = {this.state.markers}/> 
              : <LoginContainer setUserId = {this.setUserId}/>}/>

            <Route path="/mytrips"
              render={(routerProps) => localStorage.token 
              ? <MyTripsContainer/> 
              : null}/>

            <Route path="/suggestedtrips"
              render={(routerProps) => localStorage.token 
              ? <SuggestedTripsContainer/> 
              : null}/>

            <Route path="/tripdetails"
              render={(routerProps) => localStorage.token 
              ? <TripContainer/> 
              : null}/>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
